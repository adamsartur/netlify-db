export async function handler() {
  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
    },
    body: "response.body",
  };
}
