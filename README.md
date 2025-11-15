# Modern Portfolio

A stunning modern portfolio website built with Next.js, React, and Tailwind CSS. This project replicates the design and features from the reference portfolio, featuring smooth animations, gradient effects, and a professional dark theme.

## 🎨 Features

- **Modern Dark Theme** - Professional dark design with purple/pink gradient accents
- **Smooth Animations** - Reveal animations and hover effects throughout
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Interactive Navigation** - Sticky navigation with smooth scrolling and active section highlighting
- **Skills Showcase** - Animated progress bars for frontend and backend technologies
- **Project Gallery** - Beautiful project cards with hover effects and technology tags
- **Contact Form** - Functional contact form with validation
- **Accessibility** - Skip links, focus rings, and semantic HTML
- **Performance Optimized** - Lazy loading images and optimized animations

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS with custom CSS variables
- **Animations:** CSS transitions and Intersection Observer API
- **Icons:** Emoji icons for simplicity
- **Deployment:** Ready for Vercel deployment

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main portfolio component
│   └── globals.css     # Global styles and theme variables
├── components/         # Reusable components
│   ├── index.ts        # Barrel exports
│   ├── Navigation.tsx  # Navigation component
│   ├── Hero.tsx        # Hero section
│   ├── Skills.tsx      # Skills section
│   ├── Projects.tsx    # Projects section
│   ├── Contact.tsx     # Contact section
│   ├── Footer.tsx      # Footer component
│   └── SkillBar.tsx    # Skill progress bar component
├── lib/
│   └── data.ts         # Data constants and configurations
└── utils/             # Utility functions (if needed)
```

## 🎯 Sections

1. **Hero Section** - Introduction with avatar, name, and call-to-action buttons
2. **Skills Section** - Frontend/backend skills with animated progress bars and core competencies
3. **Projects Section** - Featured projects showcase with technology tags
4. **Contact Section** - Contact form and social links

## 🎨 Design Features

### Color Scheme
- Background: `#0a0a0a` (dark)
- Primary: `#8b5cf6` (purple)
- Secondary: `#ec4899` (pink)
- Text: `#ffffff` (white)
- Muted: `#6b7280` (gray)

### Animations
- Reveal animations on scroll using Intersection Observer
- Smooth progress bar animations for skills
- Hover effects on cards and buttons
- Gradient text effects
- Glass morphism navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Personal Information
Update the following in `src/lib/data.ts`:
- Name: Change "John Doe" to your name
- Title: Update "Full Stack Developer & UI/UX Enthusiast"
- Description: Customize the hero section description
- Avatar: Update the initials in the avatar circles
- Social Links: Update the social media URLs

### Skills Data
Modify the skill levels and technologies in `src/lib/data.ts`:
- `frontendSkills` array for frontend technologies
- `backendSkills` array for backend technologies
- `competencies` array for core competencies

### Projects
Update the `projects` array in `src/lib/data.ts` with your actual projects:
- Title and description
- Technologies used
- Demo and source code links
- Project icons (using emojis)

### Component Structure
The portfolio is organized into modular components:
- **Navigation** (`src/components/Navigation.tsx`) - Sticky navigation with smooth scrolling
- **Hero** (`src/components/Hero.tsx`) - Introduction section with avatar and CTAs
- **Skills** (`src/components/Skills.tsx`) - Skills showcase with progress bars
- **Projects** (`src/components/Projects.tsx`) - Project gallery with cards
- **Contact** (`src/components/Contact.tsx`) - Contact form and social links
- **Footer** (`src/components/Footer.tsx`) - Simple footer component
- **SkillBar** (`src/components/SkillBar.tsx`) - Reusable progress bar component

### Styling
Customize the theme in `src/app/globals.css`:
- Update CSS variables for colors
- Modify animation timings
- Adjust responsive breakpoints

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## ♿ Accessibility

- Semantic HTML structure
- Skip to main content link
- Focus indicators for keyboard navigation
- ARIA labels for interactive elements
- Reduced motion support for users with motion sensitivity

## 🔧 Performance

- Optimized images with Next.js Image component
- Lazy loading for better initial load times
- CSS animations that respect `prefers-reduced-motion`
- Efficient re-renders with React best practices

## 🌟 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms
The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Tailwind CSS
