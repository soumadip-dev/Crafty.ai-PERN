import logo from './logo.svg';
import gradientBackground from './gradientBackground.png';
import user_group from './user_group.png';
import star_icon from './star_icon.svg';
import star_dull_icon from './star_dull_icon.svg';
import profile_img_1 from './profile_img_1.png';
import arrow_icon from './arrow_icon.svg';
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react';
import ai_gen_img_1 from './ai_gen_img_1.png';
import ai_gen_img_2 from './ai_gen_img_2.png';
import ai_gen_img_3 from './ai_gen_img_3.png';
import ai_icon from './ai_icon.svg';

export const assets = {
  logo,
  gradientBackground,
  user_group,
  star_icon,
  star_dull_icon,
  profile_img_1,
  arrow_icon,
  ai_icon,
};

export const AiToolsData = [
  {
    title: 'AI Article Writer',
    description:
      'Craft well-written and compelling articles on any subject using advanced AI technology.',
    Icon: SquarePen,
    bg: { from: '#FF4D4D', to: '#F9CB28' }, // Red to Yellow gradient
    path: '/ai/write-article',
  },
  {
    title: 'Blog Title Generator',
    description:
      'Discover catchy and relevant blog titles instantly with the help of our smart AI tool.',
    Icon: Hash,
    bg: { from: '#FF6B6B', to: '#FFA3A3' }, // Bright red to light red gradient
    path: '/ai/blog-titles',
  },
  {
    title: 'AI Image Generation',
    description: 'Design eye-catching visuals effortlessly using our intelligent AI image creator.',
    Icon: Image,
    bg: { from: '#4ADE80', to: '#22C55E' }, // Green gradient
    path: '/ai/generate-images',
  },
  {
    title: 'Background Removal',
    description: 'Quickly erase backgrounds from your photos with precision using AI-based tools.',
    Icon: Eraser,
    bg: { from: '#F97316', to: '#EF4444' }, // Orange to red gradient
    path: '/ai/remove-background',
  },
  {
    title: 'Object Removal',
    description:
      'Easily eliminate unwanted elements from your pictures using intelligent AI editing.',
    Icon: Scissors,
    bg: { from: '#EC4899', to: '#F43F5E' }, // Pink to red gradient
    path: '/ai/remove-object',
  },
  {
    title: 'Resume Reviewer',
    description:
      'Enhance your resume with AI-driven suggestions to boost your job application success.',
    Icon: FileText,
    bg: { from: '#10B981', to: '#14B8A6' }, // Teal gradient
    path: '/ai/review-resume',
  },
];

export const DummyTestimonialData = [
  {
    name: 'Arjun Patel',
    title: 'Content Creator',
    message:
      'The AI writing tools helped me generate high-quality blog posts in minutes instead of hours. My productivity has increased by 300%!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
  },
  {
    name: 'Priya Sharma',
    title: 'Digital Marketer',
    message:
      'Our social media engagement doubled after using the AI image generator. The creative suggestions are perfect for Indian audiences.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200',
  },
  {
    name: 'Rahul Gupta',
    title: 'Startup Founder',
    message:
      'As a non-technical founder, these AI tools helped me create professional content without needing a large team. Game-changer for Indian startups!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
  },
];

export const dummyCreationData = [
  {
    id: 9,
    user_id: 'user_2yMX02PRbyMtQK6PebpjnxvRNIA',
    prompt: 'Generate a blog title for the keyword blog in the category Technology.',
    content:
      'Here are a few blog title options for a technology blog, playing with different angles:\n\n**General & Broad:**\n\n*   The Tech Blog: News, Reviews, and Insights\n*   Technology Today: Your Daily Dose of Tech\n*   The Future is Now: Exploring the World of Technology\n*   Tech Talk: Unpacking the Latest Innovations\n\n**More Specific & Intriguing:**\n\n*   Decoding Tech: Making Sense of the Digital World\n*   Beyond the Gadgets: The',
    type: 'blog-title',
    publish: false,
    likes: [],
    created_at: '2025-07-01T11:09:50.492Z',
    updated_at: '2025-07-01T11:09:50.492Z',
  },
  {
    id: 8,
    user_id: 'user_2yMX02PRbyMtQK6PebpjnxvRNIA',
    prompt: 'Generate a blog title for the keyword blog in the category General.',
    content:
      'Here are a few blog title options for a blog about blogs in the General category, ranging from straightforward to a bit more creative:\n\n**Straightforward:**\n\n*   The Blog Blog: Everything You Need to Know About Blogging\n*   Blogging Insights: Tips, Tricks, and Trends\n*   Your Guide to the World of Blogging\n\n**More Creative:**\n\n*   Beyond the Post: Exploring the Art of Blogging\n*   Blogosphere Unlocked: Navigating the World of Online Writing',
    type: 'blog-title',
    publish: false,
    likes: [],
    created_at: '2025-07-01T11:08:10.450Z',
    updated_at: '2025-07-01T11:08:10.450Z',
  },
  {
    id: 7,
    user_id: 'user_2yMX02PRbyMtQK6PebpjnxvRNIA',
    prompt: 'Write an article about AI With Coding in Short (500-800 word).',
    content:
      "## AI and Coding: A Symbiotic Partnership Reshaping the Future\n\nArtificial intelligence (AI) and coding, once distinct disciplines, are now deeply intertwined, forging a powerful symbiotic relationship that's revolutionizing industries and accelerating innovation. Understanding this connection is crucial for anyone seeking to navigate the future of technology.\n\nAt its core, AI is the ability of a machine to mimic intelligent human behavior. This is achieved through algorithms, which are essentially sets of instructions meticulously crafted by programmers – coders. Coding, therefore, is the backbone of AI, providing the language and structure necessary to bring these algorithms to life.\n\n**Coding Fuels AI: Building the Foundation**\n\nAI models don't magically appear. They are built, trained, and deployed using code. Here's how:\n\n*   **Data Preprocessing:** Raw data, the lifeblood of AI, is often messy and unusable in its original form. Coders use programming languages like Python with libraries like Pandas and NumPy to clean, transform, and prepare this data for training. This involves handling missing values, removing inconsistencies, and formatting data into a suitable structure.\n*   **Model Development:** Coders utilize programming languages like Python and R, coupled with machine learning libraries like TensorFlow, PyTorch, and scikit-learn, to build and train AI models. These libraries provide pre-built functionalities and tools that simplify the process of creating complex algorithms.\n*   **Deployment and Integration:** Once trained, AI models need to be deployed and integrated into real-world applications. This involves writing code to connect the model to existing systems, handle user input, and present the results in a user-friendly manner.\n*   **Maintenance and Optimization:** AI models are not static entities. They require constant monitoring, maintenance, and optimization to ensure they remain accurate and effective. Coders play a vital role in identifying and addressing performance issues, retraining models with new data, and adapting them to changing requirements.\n\n**AI Empowers Coding: Revolutionizing Development**\n\nThe relationship isn't just one-way. AI is also transforming the way coding is done, making developers more efficient and productive.\n\n*   **Code Completion and Suggestion:** AI-powered tools like GitHub Copilot and Tabnine analyze code context and suggest code snippets, reducing repetitive tasks and accelerating development. These tools learn from vast code repositories and can predict what a developer is likely to write next, saving significant time and effort.\n*   **Automated Testing and Debugging:** AI can automate the process of testing code and identifying bugs. By analyzing code patterns and identifying potential vulnerabilities, AI tools can help developers catch errors early and improve code quality.\n*   **Code Generation:** AI is increasingly capable of generating code from natural language descriptions. This allows developers to focus on the higher-level aspects of software design and leave the more tedious coding tasks to AI.\n*   **Personalized Learning:** AI can personalize the learning experience for aspiring coders by tailoring educational content and providing individualized feedback. This can make learning to code more effective and engaging.\n\n**The Future: Collaboration and Specialization**\n\nThe future of AI and coding is one of increasing collaboration and specialization. As AI becomes more sophisticated, coders will need to focus on higher-level tasks such as designing AI architectures, managing data pipelines, and ensuring ethical considerations are addressed.\n\nThe demand for skilled professionals who understand both AI and coding is rapidly growing. Individuals with this skillset are well-positioned to lead the charge in developing innovative AI-powered solutions across a wide range of industries.\n\n**In conclusion,** AI and coding are not separate entities but rather two sides of the same coin. Coding provides the foundation for AI, while AI empowers coding, leading to a more efficient and innovative development process. Understanding this symbiotic relationship is essential for anyone seeking to thrive in the rapidly evolving landscape of technology. As AI continues to advance, the demand for skilled professionals who can bridge",
    type: 'article',
    publish: false,
    likes: [],
    created_at: '2025-07-01T11:07:51.312Z',
    updated_at: '2025-07-01T11:07:51.312Z',
  },
];

export const dummyPublishedCreationData = [
  {
    id: 1,
    user_id: 'user_2yMX02PRbyMtQK6PebpjnxvRNIA',
    prompt: 'Generate an image of A Boy is on Boat , and fishing in the style Anime style.',
    content: ai_gen_img_1,
    type: 'image',
    publish: true,
    likes: ['user_2yMX02PRbyMtQK6PebpjnxvRNIA', 'user_2yaW5EHzeDfQbXdAJWYFnZo2bje'],
    created_at: '2025-06-19T09:02:25.035Z',
    updated_at: '2025-06-19T09:58:37.552Z',
  },
  {
    id: 2,
    user_id: 'user_2yMX02PRbyMtQK6PebpjnxvRNIA',
    prompt:
      'Generate an image of A Boy Riding a bicycle on road and bicycle is from year 2201  in the style Anime style.',
    content: ai_gen_img_2,
    type: 'image',
    publish: true,
    likes: ['user_2yMX02PRbyMtQK6PebpjnxvRNIA', 'user_2yaW5EHzeDfQbXdAJWYFnZo2bje'],
    created_at: '2025-06-19T08:16:54.614Z',
    updated_at: '2025-06-19T09:58:40.072Z',
  },
  {
    id: 3,
    user_id: 'user_2yaW5EHzeDfQbXdAJWYFnZo2bje',
    prompt: 'Generate an image of a boy riding a car on sky in the style Realistic.',
    content: ai_gen_img_3,
    type: 'image',
    publish: true,
    likes: ['user_2yaW5EHzeDfQbXdAJWYFnZo2bje'],
    created_at: '2025-06-23T11:29:23.351Z',
    updated_at: '2025-06-23T11:29:44.434Z',
    __v: 1,
  },
];
