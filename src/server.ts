import app from "./app";
import config from "./config";
import type { Server } from "node:http";
import { initWebSocket } from "./utils/webSocket";

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      console.log(`🚀 Server is running successfully! 🚀`);
    });

    // Initialize WebSocket server
    initWebSocket(server);
    console.log("✅ WebSocket server is running");
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected, closing server...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected, closing server...", err);
  process.exit(1);
});
