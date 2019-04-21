import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      console.log(request);
      const { postId } = args;
      const { user } = request;
      return true;
    }
  }
};
