import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handler(event) {
  const { id } = event.body
    ? JSON.parse(event.body)
    : { id: "d25194b8-7bd5-4988-807f-86a244f3afde" };

  let response;

  response = await prisma.mindMaps.findFirst();
  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify(response),
  };
}
