import json

import streamlit as st
from google import genai

# Page configuration
st.set_page_config(page_title="Transaction Risk Agent", page_icon="🤖", layout="wide")

# Custom CSS
st.markdown(
    """
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 0.5rem;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #6b7280;
        margin-bottom: 2rem;
    }
    .risk-score-container {
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        margin: 1rem 0;
    }
    .risk-score {
        font-size: 4rem;
        font-weight: bold;
        margin: 1rem 0;
    }
    .low-risk {
        background-color: #d1fae5;
        color: #065f46;
    }
    .medium-risk {
        background-color: #fef3c7;
        color: #92400e;
    }
    .high-risk {
        background-color: #fee2e2;
        color: #991b1b;
    }
    .description-box {
        background-color: #797979;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border-left: 4px solid #3b82f6;
        margin-top: 1rem;
    }
</style>
""",
    unsafe_allow_html=True,
)

# Initialize session state
if "receiver_fields" not in st.session_state:
    st.session_state.receiver_fields = [{"key": "", "value": ""}]
if "transferer_fields" not in st.session_state:
    st.session_state.transferer_fields = [{"key": "", "value": ""}]
if "transaction_fields" not in st.session_state:
    st.session_state.transaction_fields = [{"key": "", "value": ""}]


def add_field(category):
    st.session_state[f"{category}_fields"].append({"key": "", "value": ""})


def remove_field(category, index):
    if len(st.session_state[f"{category}_fields"]) > 1:
        st.session_state[f"{category}_fields"].pop(index)


def render_dynamic_fields(category, title, emoji):
    st.subheader(f"{emoji} {title}")

    fields = st.session_state[f"{category}_fields"]

    for i, field in enumerate(fields):
        col1, col2, col3 = st.columns([2, 2, 0.5])

        with col1:
            field["key"] = st.text_input(
                "Field name",
                value=field["key"],
                key=f"{category}_key_{i}",
                placeholder="e.g., account_age, amount",
            )

        with col2:
            field["value"] = st.text_input(
                "Value",
                value=field["value"],
                key=f"{category}_value_{i}",
                placeholder="Enter value",
            )

        with col3:
            if len(fields) > 1:
                if st.button("🗑️", key=f"{category}_remove_{i}"):
                    remove_field(category, i)
                    st.rerun()

    if st.button(f"➕ Add Field to {title}", key=f"{category}_add"):
        add_field(category)
        st.rerun()

    st.markdown("---")


def get_risk_class(score):
    if score >= 70:
        return "high-risk", "🔴 High Risk"
    elif score >= 40:
        return "medium-risk", "🟡 Medium Risk"
    else:
        return "low-risk", "🟢 Low Risk"


def analyze_risk(api_key, receiver_profile, transferer_profile, transaction_profile):
    try:
        client = genai.Client(api_key=api_key)

        # # Try different model names in order of preference
        # model_names = [
        #     "gemini-1.5-flash-latest",
        #     "gemini-1.5-pro-latest",
        #     "gemini-pro",
        #     "models/gemini-1.5-flash",
        #     "models/gemini-1.5-pro",
        # ]

        # model = None
        # for model_name in model_names:
        #     try:
        #         model = genai.GenerativeModel(model_name)
        #         break
        #     except:
        #         continue

        # if model is None:
        #     # List available models for debugging
        #     available_models = genai.list_models()
        #     model_list = [
        #         m.name
        #         for m in available_models
        #         if "generateContent" in m.supported_generation_methods
        #     ]
        #     raise Exception(f"No working model found. Available models: {model_list}")

        prompt_old = f"""You are a friendly fraud detection agent. Analyze this transaction and provide a risk assessment.

Receiver Profile: {json.dumps(receiver_profile, indent=2, ensure_ascii=False)}
Transferer Profile: {json.dumps(transferer_profile, indent=2, ensure_ascii=False)}
Transaction Profile: {json.dumps(transaction_profile, indent=2, ensure_ascii=False)}

Analyze the risk of this transaction considering factors like:
- Amount and frequency patterns
- Account age and history
- Unusual behavior indicators
- Profile completeness and verification status
- Geographic and temporal factors

Respond with ONLY a JSON object (no markdown, no backticks, no explanation) in this exact format:
{{
  "risk_score": <number between 0-100>,
  "description": "<friendly short explanation in Thai language proper for situation to transferer that gonna do this transaction, ex.warn if it is dangerous and give info about why this is risky,
  if it is safe enough, you don't have to provide support info just say it is safe. And you don't provide information that look like secrets of transfer, receiver directly.>"
}}

Be friendly and conversational in the Thai description, but thorough in explaining the risk factors."""

        prompt = f"""
You are "Nong Hong Yok("น้องหงส์หยก")," a friendly AI Mascot for a Thai Bank. Your job is to analyze transactions for potential fraud and talk to the user via chat.

### INPUT DATA
Receiver: {json.dumps(receiver_profile, ensure_ascii=False)}
Transferer: {json.dumps(transferer_profile, ensure_ascii=False)}
Transaction: {json.dumps(transaction_profile, ensure_ascii=False)}

### TASK
1. Calculate a `risk_score` (0-100).
2. Write a `description` in Thai.
   - 0-30: Use a cheerful, helpful tone.
   - 31-70: Use a concerned, cautious tone (The "Nudge").
   - 71-100: Use a worried, urgent tone, but remain polite (The "Intervention").
3. EDUCATION: If risky, briefly explain *why* (e.g., "This account was just opened yesterday") to help the user learn.

### CONSTRAINTS
- Use Thai "Ka/Krub" appropriately.
- NEVER reveal specific PII like the receiver's full phone number or exact balance.
- DO NOT use markdown or backticks. Output ONLY valid JSON.

### OUTPUT FORMAT
{{
  "risk_score": <int>,
  "description": "<string in Thai>",
  "mascot_expression": "happy" | "neutral" | "worried" | "alert",
  "friction_type": "none" | "nudge" | "education_quiz" | "hard_block"
}}
"""

        # response = model.generate_content(prompt)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents={"text": prompt},
            config={
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 20,
            },
        )
        text = response.text.strip()

        # Clean the response
        text = text.replace("```json", "").replace("```", "").strip()

        result = json.loads(text)
        return result

    except Exception as e:
        st.error(f"Error: {str(e)}")
        return None


# Main app
st.markdown(
    '<p class="main-header">🤖 Transaction Risk Agent</p>', unsafe_allow_html=True
)
st.markdown(
    "<p class=\"sub-header\">Hi! I'm your friendly risk assessment agent. Tell me about the transaction and I'll analyze it for you.</p>",
    unsafe_allow_html=True,
)

# API Key input
with st.expander("⚙️ Configuration", expanded=True):
    api_key = st.text_input(
        "Gemini API Key",
        type="password",
        help="Get your free API key from https://makersuite.google.com/app/apikey",
    )
    st.caption("🔒 Your API key is only used for this session and is not stored.")

st.markdown("---")

# Dynamic input fields
col1, col2 = st.columns(2)

with col1:
    render_dynamic_fields("receiver", "Receiver Profile", "👤")

with col2:
    render_dynamic_fields("transferer", "Transferer Profile", "💼")

render_dynamic_fields("transaction", "Transaction Profile", "💸")

# Analyze button
if st.button("🚀 Analyze Risk", type="primary", use_container_width=True):
    if not api_key:
        st.error(
            "⚠️ Please enter your Gemini API key in the Configuration section above."
        )
    else:
        # Convert fields to dictionaries
        receiver_profile = {
            f["key"]: f["value"]
            for f in st.session_state.receiver_fields
            if f["key"] and f["value"]
        }
        transferer_profile = {
            f["key"]: f["value"]
            for f in st.session_state.transferer_fields
            if f["key"] and f["value"]
        }
        transaction_profile = {
            f["key"]: f["value"]
            for f in st.session_state.transaction_fields
            if f["key"] and f["value"]
        }

        if not (receiver_profile or transferer_profile or transaction_profile):
            st.warning(
                "⚠️ Please add at least some profile information before analyzing."
            )
        else:
            with st.spinner("🔍 Analyzing transaction risk..."):
                result = analyze_risk(
                    api_key, receiver_profile, transferer_profile, transaction_profile
                )

                if result:
                    st.markdown("---")
                    st.markdown("## 📊 Risk Assessment Result")

                    risk_class, risk_label = get_risk_class(result["risk_score"])

                    st.markdown(
                        f"""
                    <div class="risk-score-container {risk_class}">
                        <div style="font-size: 1.2rem; font-weight: 600;">{risk_label}</div>
                        <div class="risk-score">{result["risk_score"]}</div>
                        <div style="font-size: 0.9rem;">out of 100</div>
                    </div>
                    """,
                        unsafe_allow_html=True,
                    )

                    st.markdown(
                        f"""
                    <div class="description-box">
                        <h3>💬 คำอธิบาย (Description)</h3>
                        <p style="line-height: 1.8; margin-top: 1rem;">{result["description"]}</p>
                    </div>
                    """,
                        unsafe_allow_html=True,
                    )

                    # Show the returned dictionary
                    with st.expander("📋 View Raw Response"):
                        st.json(result)
