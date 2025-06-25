import sql from "../configs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// Controller to get user creations
export const getUserCreations = async (req, res) => {
  try {
    // Get the user ID from the request object added by the clerk
    const { userId } = req.auth();

    // Get the creations from the database based on the user ID
    const creations = await sql`
      SELECT *
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    // If no creations are found, return an empty array
    if (creations?.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { creations: [] },
            "No creations found for this user",
          ),
        );
    }

    // Return the response with the creations data
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { creations },
          "Creation data fetched successfully",
        ),
      );
  } catch (error) {
    console.error("Error generating article:", error.message);

    // Check if the error was already an ApiError (e.g., from free_usage check) then return
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        success: false,
      });
    }
    // If not , return a generic 500 error
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while fetching creations"));
  }
};

// Controller to get published creations
export const getPublishedCreations = async (req, res) => {
  try {
    // Retrieve published creations from the database
    const creations = await sql`
      SELECT *
      FROM creations
      WHERE publish = true
      ORDER BY created_at DESC
    `;

    // Return an empty array if no creations are found
    if (creations?.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { creations: [] },
            "No published creations found",
          ),
        );
    }

    // Send the retrieved creations data in the response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { creations },
          "Published creations fetched successfully",
        ),
      );
  } catch (error) {
    console.error("Error fetching published creations:", error.message);

    // Return the error if it's an instance of ApiError
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        success: false,
      });
    }
    // Return a generic 500 error for other exceptions
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while fetching creations"));
  }
};

// Controller to handle like/unlike toggle functionality
export const toggleLikeCreation = async (req, res) => {
  try {
    // Retrieve the user ID from the request object (the user performing the like/unlike action)
    const { userId } = req.auth();

    // Retrieve the creation ID from the request body (the creation being liked or unliked)
    const { id } = req.body;
    if (!id) {
      return res.status(400).json(new ApiError(400, "Creation ID is required"));
    }

    // Fetch the creation from the database using the provided creation ID
    const creations = await sql`
      SELECT *
      FROM creations
      WHERE id = ${id}
    `;

    // If the creation is not found, return a 404 error
    if (!creations || creations.length === 0) {
      return res.status(404).json(new ApiError(404, "Creation not found"));
    }

    // Get the first creation from the array
    const creation = creations[0];
    // Get the current list of users who have liked the creation
    const currentLikes = creation.likes;

    // UserId can be number or string or other types, convert to string because text[] expects string
    const userIdStr = userId.toString();

    // Initialize the array to hold updated likes
    let updatedLikes;

    // Initialize a variable to store the response message
    let message;

    // Check if the current user has already liked the creation
    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr); // Remove the user's ID from the likes array
      message = "Creation unlike"; // Set the response message
    } else {
      updatedLikes = [...currentLikes, userIdStr]; // Add the user's ID to the likes array
      message = "Creation liked"; // Set the response message
    }

    // Format the updated likes array to match PostgreSQL's text[] input format: {value1,value2,value3}
    const formatedArray = `{${updatedLikes.join(",")}}`; // Join the updated likes array with commas and wrap it in curly braces

    // Update the creation in the database with the new likes array
    await sql`
      UPDATE creations
      SET likes = ${formatedArray}::text[]
      WHERE id = ${id}
    `;

    // Send a success response with the appropriate message
    return res.status(200).json(new ApiResponse(200, {}, message));
  } catch (error) {
    console.error("Error fetching published creations:", error.message);

    // Return the error if it's an instance of ApiError
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        success: false,
      });
    }
    // Return a generic 500 internal server error for unexpected exceptions
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while toggling like status"));
  }
};
