import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handler(event) {
  const { title, content } = JSON.parse(event.body);

  try {
    const posts = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    return {
      statusCode: 200,
      header: {
        "Content-Type": "application/json",
      },
      body: "post created",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
