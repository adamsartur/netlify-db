import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handler(event) {
  const { postId } = JSON.parse(event.body);
  try {
    const posts = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return {
      statusCode: 200,
      header: {
        "Content-Type": "application/json",
      },
      body: "post removed successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
