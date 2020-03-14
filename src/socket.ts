import WebSocket, { Server } from "ws";
import { services } from "./services";

interface IConnectionContext {
    userId?: number;
}

const connections = new Map<WebSocket, IConnectionContext>();

function getUserSockets(userId: number): WebSocket[] {
    const sockets: WebSocket[] = [];

    for (let [socket, context] of connections.entries()) {
        if (context.userId === userId) {
            sockets.push(socket);
        }
    }

    return sockets;
}

export function sendMessageToUserBySocket(userId: number, event: string) {
    const sockets = getUserSockets(userId);

    sockets.forEach((socket) => socket.send(event));

    return sockets.length > 0;
}

const wss = new Server({ port: 3001 });

wss.on("connection", (socket, request) => {
    socket.on("close", () => {
        connections.delete(socket);
    });

    const context: IConnectionContext = {};

    connections.set(socket, context);

    console.log("CONNECTION", request.headers);

    const accessToken = request.headers.authorization;

    if (!accessToken) {
        return socket.close(403, JSON.stringify({error: "AUTHENTICATION_REQUIRED"}));
    }

    const userId = services.auth.verifyAccessToken(accessToken);

    if (userId === undefined) {
        return socket.close(403, JSON.stringify({error: "AUTHENTICATION_REQUIRED"}));
    }

    context.userId = userId;
});
