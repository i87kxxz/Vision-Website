# Vision Website

A modern, animated website featuring the "Vision" brand with smooth animations and dynamic background effects.

## Features

- **Smooth Animations**: Built with Framer Motion for fluid, professional animations
- **Dynamic Background**: Particle system with connecting lines for an engaging visual experience
- **Responsive Design**: Works beautifully on all screen sizes
- **Modern Tech Stack**: React + Vite for fast development and optimal performance

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Logo

**IMPORTANT**: Place your logo PNG file in the `public` folder:

```
public/
  └── logo.png  ← Your logo goes here
```

The logo should be:
- Named exactly `logo.png`
- In PNG format
- Recommended size: 200x200px to 500x500px
- Transparent background works best

### 3. Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
├── public/
│   └── logo.png          ← Place your logo here
├── src/
│   ├── components/
│   │   ├── Vision.jsx              ← Main vision component
│   │   ├── Vision.css              ← Vision styles
│   │   ├── AnimatedBackground.jsx  ← Particle background
│   │   └── AnimatedBackground.css  ← Background styles
│   ├── App.jsx           ← Main app component
│   ├── App.css           ← Global app styles
│   ├── main.jsx          ← Entry point
│   └── index.css         ← Base styles
├── index.html
├── package.json
└── vite.config.js
```

## Customization

### Changing Colors
- Edit `src/components/Vision.css` to modify text colors and gradients
- Edit `src/components/AnimatedBackground.jsx` to change particle colors

### Adjusting Animations
- Modify `src/components/Vision.jsx` to change animation timings and effects
- Framer Motion props can be adjusted for different animation styles

### Background Effects
- Particle density can be adjusted in `AnimatedBackground.jsx` (line 42)
- Connection distance between particles can be modified (line 68)

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Canvas API** - Dynamic particle background

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Free to use and modify.

