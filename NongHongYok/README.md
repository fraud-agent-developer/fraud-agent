# K-Plus Hong Yok AI Security Agent Prototype

A high-fidelity React prototype replicating the Kasikornbank (K-Plus) transaction review screen with an AI security agent intervention system.

## Prerequisites

You need to have **Node.js** installed on your Mac. Check if you have it:

```bash
node --version
```

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org/) or use Homebrew:

```bash
brew install node
```

---

## Setup Instructions

### Step 1: Open Terminal in Project Folder

Navigate to the project directory:

```bash
cd /Applications/NongHongYok
```

### Step 2: Install Dependencies

Install all required packages (React, Vite, Tailwind CSS, Lucide icons):

```bash
npm install
```

This will take 1-2 minutes. You'll see a progress bar.

### Step 3: Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:

```
VITE v6.0.3  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser

Open your browser and go to:

```
http://localhost:5173
```

You should now see the K-Plus transaction review screen!

---

## How to Use the Prototype

1. **Debug Scenario Selector**: At the top, you'll see 5 buttons to switch between different AI intervention scenarios:
   - 🟢 **SAFE** - Transfer proceeds automatically
   - 🟡 **CAUTION** - User must confirm they checked details
   - 🟠 **WARNING** - High risk, requires sliding to accept
   - ⏳ **PRESSURE** - Behavioral check for rushed decisions
   - 🔴 **BLOCKED** - Transfer completely blocked

2. **Test the Flow**:
   - Select a scenario using the debug buttons
   - Click the **"Confirm" (Teal)** button at the bottom
   - Watch the AI agent (Hong Yok) intervene based on the selected scenario

3. **Reset**: Click "Cancel" or "Done" to reset and try another scenario

---

## Project Structure

```
NongHongYok/
├── index.html          # Entry HTML file
├── main.jsx            # React entry point
├── App.jsx             # Main component with all logic
├── index.css           # Tailwind CSS imports
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration
```

---

## Customization

### Replace Mascot Placeholders

In [App.jsx](App.jsx), look for the mascot placeholder section (around line 225):

```jsx
<div className={`w-32 h-32 mx-auto mb-4 ${currentConfig.color} ...`}>
  <div className="text-center">
    <div className={`text-xs font-bold ${currentConfig.iconColor} mt-16`}>
      [IMG: {currentConfig.placeholder}]
    </div>
  </div>
</div>
```

Replace this with:

```jsx
<img
  src="/images/green-bird.png"
  alt="Hong Yok"
  className="w-32 h-32 object-contain"
/>
```

Place your PNG images in a `public/images/` folder.

### Modify Transaction Details

Edit the `transaction` object in [App.jsx](App.jsx) (around line 18):

```jsx
const transaction = {
  senderName: 'My Account',
  senderAccount: '123-4-56789-0',
  recipientName: 'Somchai Jaidee',
  recipientAccount: '987-6-54321-0',
  amount: '50,000.00',
  bank: 'Kasikornbank'
};
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Clear Cache and Reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working

Just save the file again, or restart the dev server (Ctrl+C, then `npm run dev`)

---

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with optimized files. Preview it:

```bash
npm run preview
```

---

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool (fast HMR)
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **PostCSS** - CSS processing

---

## Next Steps for Hackathon

1. Replace placeholder mascot images with your actual Hong Yok PNG designs
2. Connect to a real API for risk analysis (currently static scenarios)
3. Add animation libraries (Framer Motion) for smoother transitions
4. Implement actual transaction logic
5. Add more sophisticated risk detection algorithms
6. Create a backend service to analyze transaction patterns

---

## Support

Created for hackathon prototype. For questions, check:
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com
- Vite docs: https://vitejs.dev

Good luck with your hackathon! 🚀
