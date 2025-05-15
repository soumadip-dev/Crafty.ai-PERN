<h1 align="center">
  <br>
  Crafty.ai
  <br>
</h1>

<div align="center">
  <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,express,postgres,github" alt="Tech Stack" width="250">
</div>

<p align="center">
  An AI-powered SaaS platform for creative and productivity tools.
</p>

---

<div align="center">
  <img src="https://github.com/soumadip-dev/Crafty.ai-PERN/blob/main/client/src/assets/SS.png" alt="Crafty.ai screenshot" width="500">
</div>

Live: [crafty.ai](https://crafty-ai.vercel.app/)

## 🌟 Features

- **Article Generator** – Generate articles from titles
- **Blog Title Generator** – Create engaging blog titles
- **AI Image Generator** – Generate images from text prompts
- **Background Remover** – Remove image backgrounds
- **Image Object Remover** – Remove objects from images
- **Resume Analyzer** – Analyze and suggest resume improvements

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Services**: Gemini API, ClipDrop API
- **Storage**: Cloudinary
- **Authentication**: Clerk
- **Database**: Neon (Postgres)

---

## 🛠️ Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/soumadip-dev/Crafty.ai.git
   cd Crafty.ai
   ```

2. **Frontend Setup**

   ```bash
   cd client
   npm install
   ```

   Create `.env`:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_key_here
   VITE_BASE_URL=http://localhost:3000
   ```

3. **Backend Setup**

   ```bash
   cd ../server
   npm install
   ```

   Create `.env`:

   ```
   PORT=your_port
   DATABASE_URL=your_postgres_url
   CLERK_PUBLISHABLE_KEY=your_key_here
   CLERK_SECRET_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   CLIPDROP_API_KEY=your_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_key_here
   CLOUDINARY_API_SECRET=your_secret_here
   ```

4. **Run Application**
   - Frontend:
     ```bash
     cd client
     npm run dev
     ```
   - Backend:
     ```bash
     cd server
     npm run dev
     ```
