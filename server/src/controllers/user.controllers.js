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
    // If not , return a geberic 500 error
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

// Controller to like Deslike toggle
