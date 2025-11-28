# Portfolio Website

A modern, responsive portfolio website built with Next.js, showcasing projects, skills, experience, and contact information. This portfolio features a dark theme with smooth animations, dynamic project fetching from GitHub, and a functional contact form.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dynamic Project Showcase**: Automatically fetches project data from GitHub API
- **Interactive Animations**: Smooth page transitions and animations using Framer Motion
- **Contact Form**: Functional contact form with EmailJS integration
- **Skills & Experience**: Comprehensive resume section with tabs for Skills, Education, Experience, and About Me
- **Project Slider**: Interactive slider to browse through featured projects
- **Modern UI Components**: Built with Shadcn UI and Radix UI for accessible components
- **Dark Theme**: Beautiful dark color scheme with accent colors

## 🛠️ Technologies Used

### Core Framework
- **Next.js 14.2.3** - React framework for production
- **React 18** - UI library
- **TypeScript/JavaScript** - Programming language

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities for Tailwind
- **PostCSS** - CSS processing

### UI Components & Libraries
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-scroll-area` - Scrollable areas
  - `@radix-ui/react-select` - Select dropdowns
  - `@radix-ui/react-tabs` - Tab navigation
  - `@radix-ui/react-tooltip` - Tooltips
- **Shadcn UI** - Re-usable component library built on Radix UI
- **Framer Motion 12.23.24** - Animation library for React
- **Swiper 12.0.3** - Modern touch slider
- **Lucide React** - Icon library
- **React Icons** - Additional icon library

### Forms & Validation
- **EmailJS** - Client-side email service for contact form
- **React Hook Form** - Form state management (via Shadcn components)

### Utilities
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind CSS classes
- **class-variance-authority** - Component variant management
- **react-countup** - Animated number counting

### Development Tools
- **ESLint** - Code linting
- **Next.js ESLint Config** - ESLint configuration for Next.js

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── contact/          # Contact form API (Resend - optional)
│   ├── contact/              # Contact page
│   ├── resume/               # Resume/About page
│   ├── services/             # Services page
│   ├── work/                 # Projects showcase page
│   ├── layout.jsx            # Root layout
│   ├── page.jsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # Shadcn UI components
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── textarea.jsx
│   │   ├── tabs.jsx
│   │   ├── tooltip.jsx
│   │   └── scroll-area.jsx
│   ├── work/                 # Work-related components
│   │   └── WorkClient.jsx    # Project showcase component
│   ├── Header.jsx            # Site header
│   ├── Nav.jsx               # Navigation component
│   ├── MobileNav.jsx         # Mobile navigation
│   ├── Photo.jsx             # Profile photo with animation
│   ├── Social.jsx            # Social media links
│   ├── Stats.jsx             # Statistics component
│   └── WorkSliderButtons.jsx # Slider navigation buttons
├── lib/                      # Utility functions
│   ├── featuredProjects.js   # Featured projects configuration
│   └── utils.js              # Helper functions
├── public/                   # Static assets
│   └── assets/              # Images, icons, etc.
│       ├── work/            # Project screenshots
│       ├── resume/          # Resume icons
│       └── skills/          # Skill icons
├── tailwind.config.js        # Tailwind configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies

```

## 🎨 Design & Styling

### Color Palette
- **Primary Background**: `#1c1c22` - Dark background
- **Accent Color**: `#0096c7` - Cyan blue for highlights and interactive elements
- **Accent Hover**: `#007ba3` - Darker shade for hover states
- **Text Colors**: White with various opacity levels for hierarchy

### Typography
- **Font Family**: JetBrains Mono (monospace font)
- **Font Loading**: Optimized with Next.js font optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # EmailJS Configuration (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Optional: GitHub API Token (for higher rate limits)
   GITHUB_TOKEN=your_github_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 EmailJS Configuration

The contact form uses EmailJS for sending emails. To configure:

1. **Create an EmailJS account**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Free tier includes 200 emails/month

2. **Set up Email Service**
   - Go to Email Services and add a service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Template**
   - Go to Email Templates and create a new template
   - Use these variables in your template:
     - `{{name}}` - Full name
     - `{{email}}` - Sender's email
     - `{{phone}}` - Phone number
     - `{{service}}` - Selected service
     - `{{message}}` - Message content
     - `{{title}}` - Email title
   - Note your Template ID

4. **Get Public Key**
   - Go to Account > API Keys
   - Copy your Public Key

5. **Add to .env.local**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🎯 Project Configuration

### Adding Featured Projects

Edit `lib/featuredProjects.js` to add or modify featured projects:

```javascript
export const featuredProjects = [
  {
    owner: "your-github-username",
    repo: "repository-name",
    title: "Project Title",
    category: "fullstack", // or "frontend"
    stack: ["React", "Node.js", "TypeScript"],
    image: "/assets/work/project-image.png",
    live: "https://project-demo.com",
    description: "Project description here",
  },
];
```

The app will automatically fetch additional data from GitHub API for each project.

### Customizing Content

- **Home Page**: Edit `app/page.jsx`
- **Resume/About**: Edit `app/resume/page.jsx`
- **Services**: Edit `app/services/page.jsx`
- **Contact Info**: Edit `app/contact/page.jsx`

## 🏗️ Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Run build command
- Optimize for production
- Provide HTTPS
- Set up CDN

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Key Features Implementation

### Dynamic Project Fetching
- Projects are fetched from GitHub API on server-side
- Fallback data is used if API call fails
- Images and metadata are customizable per project

### Animations
- Page transitions using Framer Motion
- Smooth scroll animations
- Interactive hover effects
- Loading states

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (960px), xl (1200px)
- Touch-friendly interactions
- Optimized images with Next.js Image component

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: "#1c1c22",
  accent: {
    DEFAULT: "#0096c7",
    hover: "#007ba3",
  },
}
```

### Adding New Pages
1. Create a new folder in `app/`
2. Add `page.jsx` file
3. Update navigation in `components/Nav.jsx` and `components/MobileNav.jsx`

## 📄 License

This project is private and for personal use.

## 👤 Author

**Tiago Sousa**
- Portfolio: [Your Portfolio URL]
- GitHub: [@tiagosousa10](https://github.com/tiagosousa10)
- Email: tswork.developer@proton.me

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [EmailJS](https://www.emailjs.com/) - Email service
- [Radix UI](https://www.radix-ui.com/) - Component primitives

---

Built with ❤️ using Next.js and modern web technologies
