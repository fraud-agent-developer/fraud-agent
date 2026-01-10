# Demo link:
https://fraud-agent-cpt7wmyehkjykssfej3k9d.streamlit.app/

# Hong Yok Project Full Documentation


### Introduction
Banking institutions are obligated by the Royal Edict of Thailand to be responsible for taking down mule accounts and implementing appropriate responses and prevention for this cause. Based on Bank of Thailand's classifications of mule accounts, there are five majors categories with different implementations from banking institutes and bank of thailand. 

<img width="578" height="281" alt="Image" src="https://github.com/user-attachments/assets/774e256e-c2f1-4b7d-9802-7e8a12ebaacd" />

Figure 1: classification of mule accounts based on Bank of Thailand (BioCatch)
Since 2024, the Bank of Thailand has promoted a stronger process for identifying and monitoring suspicious accounts, with an immediate response of freezing transactions for Black, Grey, and Dark brown accounts. However, accounts with suspected involvement (Light brown) still lack appropriate measures and policies due to the banks' fear of legal action regarding false positives. Consequently, financial institutions are restricted to monitoring these suspected accounts, leaving a gap that continues to result in significant financial losses for victims. (Bank of Thailand, 2025) 
Bank's Pain point
	Because financial institutions may face legal repercussions for false positives, they often limit their action to passive monitoring. Consequently, victims continue to suffer significant financial losses, as banks lack the necessary measures to effectively warn against or prevent these suspicious transactions.

### Overview of the model	
Hong Yok is designed to assist in giving personalised and effective warnings to online banking users to prevent transferring money to mule accounts.To achieve this level of effective intervention, our system goes beyond generic pop-ups. We utilize a multi-agent engine that continuously scores risk by analyzing the sender’s behavior, the recipient’s account history, and the broader transaction context. When a high risk is detected, our LLM-driven core generates specific, personalized advice tailored to that unique user and designed mascots to resonate with different stages of danger in suspected accounts.  This ensures the warning resonates psychologically, breaking the user's trance and preventing the fraud before the transaction is submitted.

### Data Inputs in Mule account detection:
According to Group-IB, indicators in detecting mule accounts lie in two categories such as indicators during account creation and during money transaction. During account creation, mule accounts are detected by the following indications:
Accounts with access from many IP-addresses and geological various.
Transactions between user accounts within chains are not related to work,family or relationships.
Income mismatch such as moving more money than they earn.


### During money transfer, mule accounts are detected by following indications:
Money speed such as how long money stays in the account
Ratio of senders and receivers
Transaction context such as money quantity 
Account behaviour history

### Technical Aspects
The technical design document outlines the architecture of Hong Yok designed to suit the Thai banking ecosystem, especially Kasikorn Bank. The goal is to balance user experience by applying frictions when necessary, using personalised messages and mascots to deliver these interventions.


### Transactional Risk Scoring Engine
The objective of Risk scoring engine is to evaluate the probability of a transaction being fraudulent in real-time, detecting common Thai fraud patterns such as mule accounts and social engineering scams. For the model, Hong Yok uses gradient boosted decision trees (XGBoost/LightGBM) for structured data or a Graph Neural Network (GNN) if account relationship data is available. 
	Furthermore, for data inputs the engine features Source/Destination accounts data (Account age, historical transaction frequency, and "Known mule" blacklists from AMLO or shared databases); Contextual data (Device ID, IP-Address, GPS location, time of day, and connection type); Behavioral biometrics (Typing Speed, hesitation time). The expected output of risk scoring engine is a normalized risk score and classifies transactions into different tiers. 

### Personalized Response Engine
The objective of this engine is to determine the most effective way to communicate a warning to a specific user. The engine generates appropriate educational literacy content and warnings according to the tier lists from risk-scoring engine, transaction context, and user's context. 
This engine uses Multi-Armed Bandit (MAB) for reinforcement learning or a Transformer-based Cross-Encoder for content ranking. The data inputs feature: User demographics(Geological location, age group); Risks context from risk-scoring engine. Hong Yok will continuously provide personality quizzes that are not complicated and engaging for users to collect these data. These personality quizzes are designed to have high-quality UI for users to share or post in social media e.g. personality in red-flower means having good money-managements and like to invest etc. 
Each resulting message is delivered through a user-friendly Budgerigar bird mascot whose state differs based on tiers and classifications of the transaction risk. For instance, in a completely safe or low risk transaction, Budgerigar mascot will appear to be green and happy while delivering messages and analysis of the transaction risks. On the other hand, Budgerigar mascot will appear to be panicked or alert in high-risk transactions while delivering appropriate frictions and warnings to the user. 

### Design of mascots
Hong Yok platform uses mascot name "Nong Hong Yok" (น้องหงษ์หยก) based on Budgerigar bird. The mascots are designed to be user-friendly and create connections with users every time they open an online banking application. The initial design of the mascot: 

<img width="618" height="343" alt="Image" src="https://github.com/user-attachments/assets/cdea7d4a-de9b-48e5-b983-355172486588" />

Figure 2: Nong Hong Yok initial design generated by Google Gemini


### Revenue models
Hong Yok operates on a B2B2C Security-as-a-Service business model, positioning as a specialized risk intelligence layer embedded directly within financial institutions' ecosystems. Rather than functioning as a standalone consumer application, the system is delivered via API and SDK integration that runs invisibly within mobile banking apps to process transaction data streams in real-time. This structure allows banks to outsource the complex technical burden of detecting suspicious accounts while retaining full control over the user experience.
The primary revenue stream is Volume-Based Licensing, a recurring monthly fee calculated based on the number of active protected users or transaction volume processed by our decision engine. This is complemented by prevention fee where our AI interventions successfully result in users reconsidering/hesitating/cancelling high-risk transactions. Additionally, we offer subscription to graph analytics data by providing banks insights in mule networking 


