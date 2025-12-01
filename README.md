# Style Library

A lightweight CSS component library for rapid web development. Built with modern design principles including glassmorphism effects and responsive layouts.

## Features

- **Zero config** - link CSS and start building
- **Fully responsive** - mobile-first design  
- **30+ components** - buttons, forms, cards, modals, and more
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

### Core Components
- **Buttons** - Primary, secondary, danger states with loading animation
- **Input Fields** - Text inputs, textareas with focus states
- **Cards** - Glassmorphism containers with hover effects
- **Navbar** - Responsive navigation with mobile hamburger menu

### Form Controls
- **Toggle Switch** - iOS-style on/off switch
- **Checkbox** - Custom styled checkboxes
- **Radio Buttons** - Custom styled radio inputs
- **Select Dropdown** - Styled select elements
- **Range Slider** - Custom range input

### Complex Modules
- **Chat Interface** - AI-style chat UI with message bubbles
- **Career Map** - Horizontal scrolling gamified skill tree
- **Resume Workshop** - Split-pane AI resume optimization UI

### Feedback Components
- **Toast** - Temporary notifications from bottom
- **Modal** - Centered dialogs with overlay
- **Badge** - Number badges and notification dots
- **Progress Bar** - Horizontal progress indicators
- **Avatar Stack** - Overlapping avatar display
- **Tags/Chips** - Closable colored tags
- **Skeleton** - Loading placeholders with shimmer animation

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
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   └── layout.css
├── components/
│   ├── buttons.css
│   ├── inputs.css
│   ├── cards.css
│   ├── navbar.css
│   ├── chat.css
│   ├── map.css
│   ├── resume.css
│   ├── forms.css
│   └── feedback.css
└── style.css (main entry)
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
