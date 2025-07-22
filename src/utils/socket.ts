import { Server, Socket } from "socket.io";

let io: Server;
const userSockets = new Map<string, Socket>();

export const setSocketServer = (serverInstance: Server) => {
    io = serverInstance;
};

export const getSocketServer = (): Server => io;

export const registerUserSocket = (userId: string, socket: Socket) => {
    userSockets.set(userId, socket);
};

export const getUserSocket = (userId: string): Socket | undefined => {
    return userSockets.get(userId);
};

export const removeUserSocket = (userId: string) => {
    userSockets.delete(userId);
};