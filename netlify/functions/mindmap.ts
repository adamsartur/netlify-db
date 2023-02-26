import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ManageMindMap {
  mindMapId?: string;
  name: string;
  nodes?: any[];
  edges?: any[];
}

export async function handler(event) {
  const {
    mindMapId,
    nodes = [],
    edges = [],
    name,
  } = JSON.parse(event.body) as ManageMindMap;

  console.log(edges);

  let result;
  const mindMapData: any = {
    name: name,
  };
  if (nodes && nodes.length > 0) {
    mindMapData.nodes = nodes;
  }
  if (edges && edges.length > 0) {
    mindMapData.edges = edges;
  }

  console.log(mindMapData);
  result = await prisma.mindMaps.create({
    data: mindMapData,
  });

  await prisma.mindMaps.delete({
    where: {
      id: mindMapId,
    },
  });

  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify(result),
  };
}
