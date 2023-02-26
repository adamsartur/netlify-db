import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ManageMindMap {
  operation: "create" | "update" | "delete";
  mindMapId: string;
  name: string;
  nodes?: any[];
  edges?: any[];
}

export async function handler(event) {
  const { operation, mindMapId, nodes, edges, name } = JSON.parse(
    event.body
  ) as ManageMindMap;

  let result;
  const mindMapData: any = {
    id: mindMapId,
  };

  if (name) {
    mindMapData.name = name;
  }
  switch (operation) {
    case "create":
      if (nodes && nodes.length > 0) {
        mindMapData.nodes = { create: nodes };
      }
      if (edges && edges.length > 0) {
        mindMapData.edges = { create: edges };
      }
      result = await prisma.mindMaps.create({ data: mindMapData });
      break;
    case "update":
      if (nodes && nodes.length > 0) {
        mindMapData.nodes = { set: nodes };
      }
      if (edges && edges.length > 0) {
        mindMapData.edges = { set: edges };
      }
      result = await prisma.mindMaps.update({
        where: { id: mindMapId },
        data: mindMapData,
      });
      break;
    case "delete":
      result = await prisma.mindMaps.delete({
        where: { id: mindMapId },
      });
      break;
    default:
      return {
        statusCode: 400,
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Unsupported operation: ${operation}`,
        }),
      };
  }

  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  };
}
