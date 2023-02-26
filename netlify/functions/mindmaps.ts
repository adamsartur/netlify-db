import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handler(event) {
  const { id } = event.body
    ? JSON.parse(event.body)
    : { id: "d25194b8-7bd5-4988-807f-86a244f3afde" };

  const mindmaps = await prisma.mindMaps.findMany({
    select: {
      nodes: true,
      edges: true,
    },
    where: {
      id: id,
    },
  });
  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mindmaps),
  };
}
