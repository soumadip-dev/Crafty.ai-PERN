import { clerkClient } from "@clerk/express";
import sql from "../configs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import OpenAI from "openai";
import axios from "axios";

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

    // Get the plan from the request object added by the auth middleware
    const plan = req.plan;

    // Only allow premium users to generate images
    if (plan !== "premium") {
      throw new ApiError(
        403,
        "This feature is only available to premium subscribers.",
      );
    }

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
