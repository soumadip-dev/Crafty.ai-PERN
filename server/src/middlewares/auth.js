// clerkClient allows us to get user data, update metadata, etc.
import { clerkClient } from "@clerk/express";
import { ApiError } from "../utils/api-error";

// Middleware to check userId and hasPremiumPlan
export const auth = async (req, res, next) => {
  try {
    // authenticate the user:: userId: Id of the loggedin user, has: check if user has a certain plan
    const { userId, has } = await req.auth();

    // Checks if the user is authenticated and has is a function
    if (!userId || typeof has !== "function") {
      throw new ApiError(401, "Unauthorized: Invalid user credentials");
    }

    // Checks if the user has a premium subscription ( true or false )
    const hasPremiumPlan = await has({ plan: "premium" });

    // Get all details about the user from Clerk database
    const user = await clerkClient.users.getUser(userId);

    // If the user is free-tier(has no premium plan) and has some free usage left
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      // Update the user's free usage value in request object
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      // updates the user’s data in Clerk to reset their free usage to 0, Premium users don’t need free usage
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      // Update the user's free usage value in request object
      req.free_usage = 0;
    }
    // Save the user's plan type in the request
    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized", error.errors));
  }
};
