# Hong Yok Customization Guide

## Overview
This guide shows you how to customize the bird mascot images and messages for each scenario in your K-Plus prototype.

---

## 📍 Location of Customization Code

Open [App.jsx](App.jsx) and find **lines 30-68** where the `birdMessages` object is defined.

---

## 🎨 Customize Bird Images & Messages

### 1. **Default Bird (Review Transaction Screen)**
This bird appears on every transaction review screen before the user clicks "Confirm".

```javascript
default: {
  title: 'Beware of scammers!',
  message: 'K-Plus will never ask for your PIN, OTP, or ask you to install remote control apps.',
  birdImagePath: '' // Add: '/images/blue-bird.png'
}
```

**To customize:**
- Place your bird PNG in `/Applications/NongHongYok/public/images/blue-bird.png`
- Update `birdImagePath: '/images/blue-bird.png'`
- Change `title` and `message` text as needed

---

### 2. **SAFE Scenario - Green Bird 🟢**
Shown when the transaction is verified as safe.

```javascript
[MASCOT_STATES.SAFE]: {
  title: 'Transfer is Safe!',
  message: 'All security checks passed. Your transaction will proceed shortly.',
  birdImagePath: '' // Add: '/images/green-bird.png'
}
```

**Recommended Image:** Green bird with a shield or checkmark

---

### 3. **CAUTION Scenario - Yellow Bird 🟡**
Shown for first-time transfers requiring extra verification.

```javascript
[MASCOT_STATES.CAUTION]: {
  title: 'First Time Transfer',
  message: 'This is your first transfer to this recipient. Please verify carefully.',
  birdImagePath: '' // Add: '/images/yellow-bird.png'
}
```

**Recommended Image:** Yellow bird with a magnifying glass or looking curious

---

### 4. **WARNING Scenario - Orange Bird ��**
Shown when high-risk factors are detected.

```javascript
[MASCOT_STATES.WARNING]: {
  title: 'High Risk Detected',
  message: 'This transaction shows suspicious patterns. Please review carefully before proceeding.',
  birdImagePath: '' // Add: '/images/orange-bird.png'
}
```

**Recommended Image:** Orange bird with a stop hand or alert symbol

---

### 5. **PRESSURE Scenario - Tied Bird ⏳**
Shown when behavioral analysis detects user might be rushed.

```javascript
[MASCOT_STATES.PRESSURE]: {
  title: 'Take Your Time',
  message: 'Never feel rushed to make a transfer. Scammers often create urgency.',
  birdImagePath: '' // Add: '/images/tied-bird.png'
}
```

**Recommended Image:** Bird tied with ropes or looking stressed

---

### 6. **BLOCKED Scenario - Red Bird 🔴**
Shown when transfer is completely blocked due to fraud.

```javascript
[MASCOT_STATES.BLOCKED]: {
  title: 'Transfer Blocked!',
  message: 'This account has been flagged for fraudulent activity. Your money is protected.',
  birdImagePath: '' // Add: '/images/red-bird.png'
}
```

**Recommended Image:** Red bird in a lock or with a stop sign

---

## 📂 File Structure

```
NongHongYok/
├── App.jsx                    ← Edit lines 30-68 for messages
├── public/
│   └── images/                ← Put your PNG files here
│       ├── blue-bird.png      (Default)
│       ├── green-bird.png     (Safe)
│       ├── yellow-bird.png    (Caution)
│       ├── orange-bird.png    (Warning)
│       ├── tied-bird.png      (Pressure)
│       └── red-bird.png       (Blocked)
```

---

## ✅ Quick Steps

### **Step 1: Add Your Images**
1. Open Finder → Applications → NongHongYok → public → images
2. Drag and drop your 6 bird PNG files into this folder
3. Name them according to the guide above

### **Step 2: Update the Code**
1. Open [App.jsx](App.jsx:30-68)
2. Find the `birdMessages` object (lines 30-68)
3. For each scenario, update the `birdImagePath` with your filename:
   ```javascript
   birdImagePath: '/images/your-bird-name.png'
   ```

### **Step 3: Customize Text (Optional)**
- Change the `title` for the heading
- Change the `message` for the detailed description

### **Step 4: Save & Refresh**
- Save [App.jsx](App.jsx)
- Your browser will auto-reload
- Test each scenario using the debug buttons at the top

---

## 🎨 Image Recommendations

- **Format:** PNG with transparent background
- **Size:** 64x64 to 128x128 pixels
- **File size:** Under 100KB each
- **Style:** Consistent illustration style across all birds

---

## 🧪 Testing

Use the debug buttons at the top of the screen:
- **Safe** → See green bird
- **Caution** → See yellow bird
- **Warn** → See orange bird
- **Rush** → See tied bird
- **Block** → See red bird

---

## 💡 Example

```javascript
// Before
birdImagePath: '' // Empty - shows placeholder

// After
birdImagePath: '/images/green-bird.png' // Shows your actual bird!
```

---

## 🆘 Troubleshooting

**Bird not showing?**
- Check the file path is correct: `/images/filename.png`
- Make sure the file is in the `public/images/` folder
- Check the filename matches exactly (case-sensitive!)
- Try refreshing the browser with Cmd+Shift+R (hard refresh)

**Image too big/small?**
- The image container is 64x64 pixels
- Use images around 128x128px for best quality
- PNG format with transparency works best

---

Happy customizing! 🎨✨
