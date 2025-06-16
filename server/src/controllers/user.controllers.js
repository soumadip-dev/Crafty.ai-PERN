import sql from "../configs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

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
