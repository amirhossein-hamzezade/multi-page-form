# MultiPage-form

A clean, responsive **multi-step form** built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

---

## ✨ Features

- **Saves Progress Automatically**: If you type your name on step one and click through the wizard, your data stays saved in `localStorage`. If you refresh or move backward, your progress isn't lost.
- **Modern React 19 Forms**: Uses the new `useActionState` hook alongside Next.js Server Actions to process form submissions smoothly on the server.
- **Smart Server-Side Validation**: Built with **Zod**. It catches errors (like missing fields or poorly formatted emails) on the server side and feeds human-readable errors right back to the input fields.
- **Accessible Custom Components**: Includes a custom calendar DatePicker built on top of **Radix UI** primitives and `react-day-picker`.
- **Seamless Dark Mode**: Built with `next-themes` and Tailwind v4 CSS variables for a native-feeling dark and light mode toggle.

---

## 🏗️ Project Structure

I used Next.js Route Groups `(form)` to keep the wizard steps organized under a shared navigation layout without messing up the clean URL structure.

```text
app/
├── (form)/              # Multi-step layout folder
│   ├── section-one/     # Step 1: Name and Last Name
│   ├── section-two/     # Step 2: Email and Birthday (with custom calendar)
│   ├── section-three/   # Step 3: Next step placeholder
│   ├── section-overview/# Step 4: Summary view
│   └── layout.tsx       # Sidebar navigation and container layout
├── components/          # Reusable inputs, datepickers, and buttons
├── providers/           # Global themes context
└── schemas.ts           # Zod validation schemas for all steps
```

---

## 🚀 Getting Started

### Prerequisites

You will need **Node.js 18+** and **pnpm** installed.

### Setup

1. **Clone the project**

   ```bash
   git clone https://github.com/somthing/multi-page-form.git
   cd multi-page-form
   ```

2. **Install the dependencies**

   ```bash
   pnpm install
   ```

3. **Run the local development server**
   ```bash
   pnpm dev
   ```
   Now, open [http://localhost:3000](http://localhost:3000) in your browser.
