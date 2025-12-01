# Style Library

A complete design system for building modern web applications. Built with glassmorphism effects, responsive layouts, and 40+ production-ready components.

## 🎉 Latest Update (v2.0)

**Updated: December 1, 2025**

Style Library has been enhanced based on the modern design patterns from our Resume Center prototype! 

**What's New:**
- ✨ **Premium & Ghost Buttons** - New button styles perfect for gradient backgrounds
- 🎨 **Enhanced Gradients** - Beautiful purple and gold gradient variables
- 📊 **Animated Score Bars** - Smooth progress animations with gradient fills
- 📝 **Form Sections** - Mobile-optimized form components with enhanced styling
- 🎯 **Larger Border Radius** - More modern 20px-24px rounded corners
- 💎 **Improved Shadows** - Better depth and elevation effects

👉 See [UPDATES.md](UPDATES.md) for detailed changelog.

## Features

- **Zero config** - link CSS and start building
- **Fully responsive** - mobile-first design  
- **40+ components** - complete UI toolkit for any application
- **No dependencies** - pure CSS with optional JS helpers
- **Themeable** - easy customization via CSS variables
- **8px grid system** - consistent spacing throughout

## Quick Start

Link the CSS file in your HTML:

```html
<link rel="stylesheet" href="css/style.css">
```

For interactive components (navbar, modals, etc.), also include:

```html
<script src="js/script.js"></script>
```

### Basic Example

```html
<div class="container mt-lg">
    <h1 class="text-h1 mb-md">Hello World</h1>
    <div class="card p-lg">
        <p class="text-body mb-md">A glassmorphism card component</p>
        <button class="btn btn-primary">Get Started</button>
    </div>
</div>
```

## Component Categories

### Basic UI
- **Buttons** - Primary, secondary, danger, premium, ghost states with loading animation
- **Input Fields** - Text inputs, textareas with focus states
- **Cards** - Glassmorphism containers with hover effects (enhanced with larger radius)
- **Navbar** - Responsive navigation with mobile hamburger menu

### Form Controls
- **Toggle Switch** - iOS-style on/off switch for settings
- **Checkbox** - Custom checkboxes for selections
- **Radio Buttons** - Single-choice option selector
- **Select Dropdown** - Styled dropdown menus
- **Range Slider** - Numeric value slider
- **Form Sections** - NEW! Mobile-optimized form groups with styled fields
- **Form Fields** - NEW! Enhanced input and textarea with uppercase labels

### Selection & Display
- **Option Cards** - Quiz and selection interfaces with A/B/C/D labels
- **Grid Cards** - Position/category selection in grid layout
- **Segment Control** - iOS-style tab switcher for options
- **List Items** - History and records display with icons/avatars
- **Empty State** - No-data placeholders with CTAs
- **Score Display** - Star ratings, progress bars, circular scores, animated score bars (NEW!)

### Navigation
- **Tabs** - Content organization with multiple tab styles
- **Accordion** - Expandable FAQ and detail sections
- **Timeline** - Progress visualization and history tracking

### Feedback
- **Toast** - Temporary notifications (success/error/info)
- **Modal** - Centered dialogs with overlay backdrop
- **Badge** - Notification counts and status indicators
- **Progress Bar** - Task completion and loading states
- **Avatar Stack** - User group display with overlap
- **Tags/Chips** - Removable labels and filters
- **Skeleton** - Loading placeholders with shimmer effect

### Complex Modules
- **Chat Interface** - AI conversation UI with typing indicator
- **Career Map** - Gamified horizontal skill progression
- **Resume Workshop** - AI-powered resume editor with diff view

## Key Design Tokens

### Colors
```css
--primary-color: #6C5CE7
--secondary-color: #00B8D4
--success-color: #00B894
--danger-color: #FF6B6B
```

### Spacing (8px grid)
```css
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

Use utility classes: `.mt-sm`, `.mb-md`, `.p-lg`, etc.

### Typography
```css
.text-h1    /* 32px, bold */
.text-h2    /* 28px, bold */
.text-h3    /* 24px, semibold */
.text-body  /* 16px, regular */
.text-small /* 14px */
```

## Layout Utilities

```html
<!-- Flexbox -->
<div class="d-flex gap-md">...</div>
<div class="d-flex justify-between align-center">...</div>
<div class="flex-center">Centered content</div>

<!-- Grid -->
<div class="grid-2">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

<!-- Container -->
<div class="container">Responsive container</div>
```

## Customization

Override CSS variables to customize the theme:

```css
:root {
    --primary-color: #FF6B6B;
    --border-radius: 8px;
    --spacing-md: 20px;
}
```

## Responsive Behavior

All components are mobile-optimized with breakpoint at 768px:
- Typography scales down 10-15%
- Padding reduces 20-30%
- Grids switch to single column
- Navbar switches to hamburger menu

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

Requires modern CSS features (CSS Grid, Variables, `backdrop-filter`). IE11 is not supported.

## Project Structure

```
css/
├── base/
│   ├── variables.css      # Design tokens (colors, spacing)
│   ├── reset.css          # Browser normalization
│   ├── typography.css     # Text styles and scales
│   └── layout.css         # Spacing utilities and grid
├── components/
│   ├── buttons.css        # Button variants
│   ├── inputs.css         # Input fields
│   ├── cards.css          # Card containers
│   ├── navbar.css         # Navigation bar
│   ├── forms.css          # Form controls (switch, checkbox, etc.)
│   ├── feedback.css       # Toast, modal, badge, progress
│   ├── options.css        # Option cards for quizzes
│   ├── grid-cards.css     # Grid selection cards
│   ├── segment-control.css # Tab switcher
│   ├── list-items.css     # List and history items
│   ├── empty-state.css    # No-data placeholders
│   ├── score-display.css  # Ratings and metrics
│   ├── tabs.css           # Tab navigation
│   ├── accordion.css      # Expandable sections
│   ├── timeline.css       # Progress timeline
│   ├── chat.css           # Chat interface
│   ├── map.css            # Career progression map
│   └── resume.css         # Resume workshop
└── style.css (main entry point)
```

## Examples

Check `index.html` for a live component showcase with all available components and their usage examples.

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Commit with semantic messages: `git commit -m "feat: add new component"`
3. Push and open a PR

Follow commit convention: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

## License

MIT License © 2025 IPD-L5S4-Group1

---

**Repository**: [github.com/IPD-L5S4-Group1/Style-Library](https://github.com/IPD-L5S4-Group1/Style-Library)
