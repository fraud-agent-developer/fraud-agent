# Images Folder

## How to Add Your Bird Icon

### Step 1: Add Your Image
Place your Hong Yok bird PNG file in this folder. For example:
- `hong-yok-bird.png`
- `blue-bird.png`
- Or any name you prefer

### Step 2: Update the Code
Open `App.jsx` and find line 34:

```javascript
birdImagePath: '' // Add your image path here later: '/images/hong-yok-bird.png'
```

Change it to:

```javascript
birdImagePath: '/images/hong-yok-bird.png'
```

(Replace `hong-yok-bird.png` with your actual filename)

### Step 3: Refresh Browser
Save the file and your browser will automatically reload with your bird image!

---

## Image Recommendations

- **Format**: PNG (with transparent background is best)
- **Size**: 64x64 pixels to 128x128 pixels
- **File size**: Keep under 100KB for fast loading

---

## Current Location

```
/Applications/NongHongYok/public/images/
```

You can also access this folder:
1. Open Finder
2. Go to Applications folder
3. Open NongHongYok folder
4. Open public folder
5. Open images folder
6. Drag and drop your PNG file here!
