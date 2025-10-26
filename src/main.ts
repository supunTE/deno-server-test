import { startServer } from "./server.ts";

const PORT = 8000;

startServer(PORT).then(() => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}).catch((error) => {
  console.error("Failed to start the server:", error);
});