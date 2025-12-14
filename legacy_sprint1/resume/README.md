# 📱 Resume Center - Mobile Prototype

An advanced mobile resume management prototype, designed for the iPhone 17 Pro Max.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Device](https://img.shields.io/badge/device-iPhone%2017%20Pro%20Max-purple)
![Status](https://img.shields.io/badge/status-Prototype-green)

## ✨ Features

- 🎨 **Modern Design** - Featuring gradient colors, a glassy effect, and smooth animation.
- 📱 **iPhone 17 Pro Max** - 430 x 932 pixels, supports Dynamic Island
- 🤖 **AI Analysis Simulation** - Intelligent Resume Scoring and Recommendation System
- 💎 **Advanced Interaction** - Haptic feedback, smooth transitions, and micro-animations
- 📊 **Visualized Scoring** - Intuitive score display and grading system
- 🎯 **Priority Recommendations** - Suggestions for Improving Color Coding

## 📁 Project Structure

resume/
├── index.html # Main HTML file (clean and concise)
├── css/
│ ├── mobile-frame.css # Mobile emulator shell style
│ └── resume-custom.css # Custom styles for the Resume feature
├── js/
```
│ └── resume-logic.js # Interaction logic and animation
└── README.md # This document
## 🚀 Quick Start

### 1. Open the prototype

Open `index.html` directly in your browser:

bash

# Use a local server (recommended)
cd resume
```
python3 -m http.server 8000

# Or use VS Code Live Server
# Right click index.html -> Open with Live Server
Then access: `http://localhost:8000`

### 2. Function Demonstration Process

**Basic Process:**

1. Click "New Resume" to create a resume.
2. Select "Upload PDF" or "Use Template"
3. After uploading, click "AI Analyze".
4. Review the analysis report and recommendations.
5. Use the "Preview" and "Edit" functions.
**Full functionality:**

- ✅ Resume Upload (Simulated)
- ✅ AI analysis progress bar
```
- ✅ Rating Display (0-100 points, AF level)
- ✅ Priority recommendations (high/medium/low)
- ✅ PDF Preview
- ✅ Resume editing interface
- ✅ Toast notification

## 🎨 Design Guidelines

### Equipment Specifications

| Attribute | Value |
|------|-----|
| Device Model | iPhone 17 Pro Max |
| Screen Size | 430 x 932 px |
| Corner radius | 55px |
| Dynamic Island | 125 x 37 px |

### Color Scheme

/* Main color scheme - purple gradient */
--primary: linear-gradient(135deg, #667eea, #764ba2);
/* Functional colors */

--gold: linear-gradient(135deg, #FFD700, #FFA500); /* Integral */
--high-priority: linear-gradient(135deg, #FFE5E5, #FFB3B3); /* High priority */
--medium-priority: linear-gradient(135deg, #FFF9E6, #FFE5B3); /* Medium priority */
--low-priority: linear-gradient(135deg, #E8F4FD, #CDDAFD); /* Low priority */
### Interaction Specifications
- **Minimum button height:** 52px (compliant with Apple HIG standard)

- **Touch feedback**: `transform: scale(0.97)`

- **Animation Duration**: 0.3s (Standard), 0.2s (Fast)
- **Card Spacing**: 12px (Small), 24px (Standard), 32px (Large)
## 🔧 Technical Details
### Dependencies

- **Style Library** - Basic component library (relative reference `../Style_Library/`)

- **Font Awesome 6.4.0** - Icon Library

- **No other dependencies** - Pure HTML/CSS/JavaScript
### Browser Compatibility
- ✅ Chrome 88+

- ✅ Safari 14+

```css
- ✅ Firefox 85+
- ✅ Edge 88+
Support required:

- CSS Variables
- CSS Grid & Flexbox
- `backdrop-filter` (glass effect)
- ES6 JavaScript
## 📝 Custom Guidelines

```

### Change color theme

Edit `css/resume-custom.css`:

/* Change the main color scheme */
.hero-card {
background: linear-gradient(135deg, #yourcolor1, #yourcolor2) !important;
.page-title {
background: linear-gradient(135deg, #yourcolor1, #yourcolor2);

-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
### Modify phone size
Edit `css/mobile-frame.css`:
.mobile-wrapper {
width: 393px; /* iPhone 15 Pro */

height: 852px;

### Add new suggestion types

Edit the `generateSuggestions()` function in `js/resume-logic.js`:
```javascript
const suggestions = [
{
icon: '🚀',
title: 'Your Title'

desc: 'your description',

priority: 'high' // or 'medium', 'low'

},
// ... More suggestions
];
## 🎯 User Story Mapping
User Story corresponding to this prototype:
As a job-seeking student
I want to be able to quickly upload and analyze my resume on a mobile device.
In order to obtain AI-driven optimization suggestions and improve job search success rate.
**Key Scenarios:**
1. ✅ Mobile resume upload (PDF)
2. ✅ AI-powered intelligent analysis and scoring

3. ✅ Tiered suggestions displayed (by priority)

```css

4. ✅ Resume preview and editing
5. ✅ Points System Display
## 📊 Performance Optimization

}
- **CSS separation** - Modular loading for easier maintenance
- **Animation Optimization** - Use `transform` and `opacity` (GPU accelerated)
- **Lazy loading** - Suggestion list generated on demand
- **No image dependency** - Uses Emoji and icon fonts
## 🐛 Known Constraints

}

```
- ⚠️ This prototype is a **static demo** and has no backend integration.
- ⚠️ The uploaded PDF is a **simulation function** and has not been actually parsed.
- ⚠️ The AI ​​analysis is for **front-end animation**, with no actual AI calls.

- ⚠️ Data is not persistently saved.

## 🔮 Future Expansion Directions
```css
- [ ] Integrates a real PDF parsing API
- [ ] Connect to backend AI analytics services

- [ ] Add more resume templates

}
```
- [ ] Supports resume export (PDF/Word)
- [ ] Implement resume version history
- [ ] Add job tracking feature
## 📄 License

This prototype is for educational and demonstration purposes only.

**Development Team**: IPD L5S4 Group 1

**Updated Date: 2025-12-01**

**Contact Information:** [Project Repository](https://github.com/your-repo)
## 🎉 Acknowledgements
- Style Library - Provides basic components

- Font Awesome - Icon Support

- Apple HIG - Design Guide
```
---

