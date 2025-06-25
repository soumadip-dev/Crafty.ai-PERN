<h1 align="center">
  <br>
  Crafty.ai
  <br>
</h1>

<div align="center">
  <a href="https://github.com/yourusername">
    <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,express,postgres,github" alt="Tech Stack" width="300" style="padding: 15px 0;">
  </a>
</div>

<h3 align="center">
  An AI-powered SaaS platform bringing together creative and productivity tools powered by artificial intelligence.
</h3>

---

## 🕸️ Live Demo

Experience the live application: [crafty.ai](https://crafty-ai.example.com)

## 🌟 Features

- 📝 **Article Generator** – Input a title and desired length to generate full articles
- 📌 **Blog Title Generator** – Generate engaging blog titles based on keywords
- 🖼️ **AI Image Generator** – Turn text prompts into unique images using generative AI
- 🔍 **Background Remover** – Upload an image to get a version with the background removed
- ❌ **Image Object Remover** – Remove specified objects from images using AI
- 📊 **Resume Analyzer** – Upload a resume and get detailed analysis and suggestions

## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **AI Services**: OpenAI API, ClipDrop API
- **Storage**: Cloudinary for image hosting
- **Authentication**: Clerk
- **Database**: Neon (serverless Postgres)

---

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
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

   Create a `.env` file with:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_key_here
   VITE_BASE_URL=http://localhost:3000
   ```

3. **Backend Setup**

   ```bash
   cd ../server
   npm install
   ```

   Create a `.env` file with:

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

4. **Running the Application**
   - In one terminal (frontend):
     ```bash
     cd client
     npm run dev
     ```
   - In another terminal (backend):
     ```bash
     cd server
     npm run dev
     ```

---
