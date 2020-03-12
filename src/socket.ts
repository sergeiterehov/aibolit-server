import socketio, { Socket } from "socket.io";
import { Server } from "http";
import { services } from "./services";

interface IConnectionContext {
    userId?: number;
}

const connections = new Map<Socket, IConnectionContext>();

function getUserSockets(userId: number): Socket[] {
    const sockets: Socket[] = [];

    for (let [socket, context] of connections.entries()) {
        if (context.userId === userId) {
            sockets.push(socket);
        }
    }

    return sockets;
}

export function sendMessageToUserBySocket(userId: number, event: string, ...args: any[]) {
    const sockets = getUserSockets(userId);

    sockets.forEach((socket) => socket.emit(event, ...args));

    return sockets.length > 0;
}

export function registerSocket(server: Server) {
    const io = socketio(server);

    io.use((socket, next) => {
        const context: IConnectionContext = {};

        connections.set(socket, context);

        const accessToken = socket.handshake.headers["authorization"];
        const userId = services.auth.verifyAccessToken(accessToken);

        if (userId === undefined) {
            return next(new Error("NOT_AUTHORIZED"));
        }

        context.userId = userId;

        return next();
    });

    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            connections.delete(socket);
        });
    });
}
