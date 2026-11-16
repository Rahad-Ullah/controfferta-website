import { io, type Socket } from "socket.io-client";
import { envConfig } from "@/lib/env-config";

let socket: Socket | null = null;

export async function getSocket(): Promise<Socket | null> {
  if (typeof window === "undefined") return null;

  const { apiBaseUrl } = await envConfig();

  if (!socket) {
    socket = io(apiBaseUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("Socket disconnected:", reason);
    });
  } else if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
