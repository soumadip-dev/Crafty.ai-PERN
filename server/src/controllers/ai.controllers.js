// Import necessary modules
import dotenv from "dotenv";
import { clerkClient } from "@clerk/express";
import sql from "../configs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import OpenAI from "openai";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

// Load environment variables
dotenv.config();

// Create an instance of the OpenAI API
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Controller to Generate article
export const generateArticle = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the prompt and length from the request body
    const { prompt, length } = req.body;
    if (!prompt) throw new ApiError(400, "Prompt is required.");
    if (!length) throw new ApiError(400, "Length is required.");

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Get the free usage from the request object added by the auth middleware
    const free_usage = req.free_usage;

    console.log(plan, free_usage);

    // Check if the user has exceeded their free usage limit
    if (plan !== "premium" && free_usage >= 10) {
      throw new ApiError(
        403,
        "You have exceeded your free usage limit. Please upgrade to premium to continue.",
      );
    }

    // Generate the article using the OpenAI API
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // Insert the article into the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    // Update the user's free usage
    if (plan !== "premium") {
      const user = await clerkClient.users.getUser(userId);
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          free_usage: free_usage + 1,
        },
      });
    }

    // Return the generated article
    return res
      .status(200)
      .json(
        new ApiResponse(200, { content }, "Article generated successfully"),
      );
  } catch (error) {
    console.error("Error generating article:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while generating the article"),
      );
  }
};

// Controller to Generate blog title
export const generateBlogTitle = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the prompt and length from the request body
    const { prompt } = req.body;
    if (!prompt) throw new ApiError(400, "Prompt is required.");

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Get the free usage from the request object added by the auth middleware
    const free_usage = req.free_usage;

    console.log(plan, free_usage);

    // Check if the user has exceeded their free usage limit
    if (plan !== "premium" && free_usage >= 10) {
      throw new ApiError(
        403,
        "You have exceeded your free usage limit. Please upgrade to premium to continue.",
      );
    }

    // Generate the blog title using the OpenAI API
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    // Insert the blog title into the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // Update the user's free usage
    if (plan !== "premium") {
      const user = await clerkClient.users.getUser(userId);
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          free_usage: free_usage + 1,
        },
      });
    }

    // Return the generated blog title
    return res
      .status(200)
      .json(
        new ApiResponse(200, { content }, "Article generated successfully"),
      );
  } catch (error) {
    console.error("Error generating article:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while generating the article"),
      );
  }
};

// Controller to Generate Image
export const generateImage = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the prompt and style from the request body
    const { prompt, publish } = req.body;
    if (!prompt) throw new ApiError(400, "Prompt is required.");
    if (publish === undefined) throw new ApiError(400, "Publish is required.");

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Only allow premium users to generate images
    if (plan !== "premium") {
      throw new ApiError(
        403,
        "This feature is only available to premium subscribers.",
      );
    }

    // Generate the image using the ClipDrop API
    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary",
    ).toString("base64")}`;

    // Upload the image to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Insert the image into the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type,publish) 
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image',${publish ?? false})
    `;
    // Return the generated image
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { content: secure_url },
          "Image generated successfully",
        ),
      );
  } catch (error) {
    console.error("Error generating image:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while generating the image"),
      );
  }
};

// Controller to Remove Background From Image
export const removeImageBackground = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the image from Multer (req.file contains the uploaded file)
    const { image } = req.file;
    if (!image) {
      throw new ApiError(400, "No image file uploaded");
    }

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Only allow premium users to generate images
    if (plan !== "premium") {
      throw new ApiError(
        403,
        "This feature is only available to premium subscribers.",
      );
    }

    // Step 1: Upload image to Cloudinary
    // Step 2: While uploading, directly apply background removal effect
    // Entire operation happens in a single API call
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          // Remove background using Cloudinary's AI model
          effect: "background_removal",
          // Optional: Explicitly mention default model (remove_the_background)
          //* Not mandatory – Cloudinary uses this by default if not provided
          background_removal: "remove_the_background",
        },
      ],
    });

    // Insert the image into the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Remove Background From Image', ${secure_url}, 'image')
    `;

    // Return the background removed image
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { content: secure_url },
          "Background removed successfully",
        ),
      );
  } catch (error) {
    console.error("Error removing background:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while removing the background"),
      );
  }
};

// Controller to Remove any Object From Image
export const removeImageObject = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the image from Multer
    const { image } = req.file;
    if (!image) {
      throw new ApiError(400, "No image file uploaded");
    }

    // Get the object from the request body
    const { object } = req.body;

    if (!object) {
      throw new ApiError(400, "No object specified for removal");
    }

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Only allow premium users to generate images
    if (plan !== "premium") {
      throw new ApiError(
        403,
        "This feature is only available to premium subscribers.",
      );
    }

    // Step 1: Upload image to Cloudinary normally (without any transformation)
    // Goal: Get the image's `public_id` so we can apply transformations later
    const { public_id } = await cloudinary.uploader.upload(image.path);

    // Step 2: Generate transformed URL using Cloudinary's `gen_remove` effect
    // This removes the specified object from the uploaded image
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image", // Explicitly set type for safety
    });

    // Insert the image into the database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${`Removed ${object} From Image`}, ${imageUrl}, 'image')
    `;

    // Return the object removed image
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { content: imageUrl },
          "Object removed successfully",
        ),
      );
  } catch (error) {
    console.error("Error removing object:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while removing the object"),
      );
  }
};

// Controller to Resume Review
export const resumeReview = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the resume from Multer
    const resume = req.file;
    if (!resume) {
      throw new ApiError(400, "No resume file uploaded");
    }

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Only allow premium users to generate images
    if (plan !== "premium") {
      throw new ApiError(
        403,
        "This feature is only available to premium subscribers.",
      );
    }

    // Check if the resume size is greater than 5mb and throw an error
    if (resume.size > 5 * 1024 * 1024) {
      throw new ApiError(400, "Resume file size exceeds allowed size (5MB)");
    }

    // Convert PDF to buffer
    const dataBuffer = fs.readFileSync(resume.path);

    // convert buffer to text using pdf-parse
    const pdfData = await pdf(dataBuffer);

    // Generate the resume review prompt
    const prompt = `
Please review the following resume and provide **constructive feedback** focusing on the following aspects:

- **Content Relevance**: Is the information appropriate and aligned with the candidate's goals?
- **Clarity**: Is the language clear, concise, and professional?
- **Structure & Flow**: Is the resume well-organized and easy to read?

Your response should be formatted in **Markdown**, including:
- Headings (e.g., Strengths, Weaknesses, Areas for Improvement)
- Bullet points
- **Bold text** where appropriate for emphasis

Be specific in your feedback, and suggest concrete improvements where possible.

Resume Content:
${pdfData.text}
`;

    // Generate the resume review using the Gemini API
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // Insert the resume into the database
    await sql`
        INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${"Review the uploaded resume"}, ${content}, 'resume-review')
      `;

    // TODO: Delete the uploaded file after processing
    // //  fs.unlinkSync(resume.path);

    // Return the resume review
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { content },
          "Resume review generated successfully",
        ),
      );
  } catch (error) {
    console.error("Error removing object:", error.message);

    // TODO: Ensure file is deleted even if processing fails
    //// if (resume.path && fs.existsSync(resume.path)) {
    //// fs.unlinkSync(resume.path);
    //// }

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // If not, return a generic 500 error
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while reviewing the resume"),
      );
  }
};
