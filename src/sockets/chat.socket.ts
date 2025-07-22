import { Server, Socket } from "socket.io";
import { getUserSocket, registerUserSocket,removeUserSocket } from "../utils/socket";

const chatKeys: Map<string, Map<string, string>> = new Map();

export const setUpChatSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
        
        socket.on("register", (userId: string) => {
            registerUserSocket(userId, socket);
            console.log(`User registered: ${userId}`);
        });

        socket.on("upload_public_key", ({chatId, userId, publicKey}) => {
            if (!chatKeys.has(chatId)) {
                chatKeys.set(chatId, new Map());
            }
            chatKeys.get(chatId)!.set(userId, publicKey);
            console.log(`Public key uploaded for chat ${chatId} by user ${userId}`);
        });

        socket.on("request_public_key", ({chatId, targetUserId}, callback) => {
            const userMap = chatKeys.get(chatId);
            if (userMap && userMap.has(targetUserId)) {
                callback({sucess: true, publicKey: userMap.get(targetUserId)});
            }else{
                callback({success: false, message: "Public key not found"});
            }
        });

        socket.on("send_encrypted_message", ({chatId, from, to, encrypted_message}) => {
            const recipientSocket = getUserSocket(to);
            if (recipientSocket) {
                recipientSocket.emit("receive_encrypted_message", {
                    chatId,
                    from,
                    encrypted_message
                });
                console.log(`Encrypted message sent from ${from} to ${to} in chat ${chatId}`);
            }else{
                console.log(`User ${to} is not connected`);
            }
        });

        socket.on("disconnect", () => {
            for(const [userId, sock] of [...getUserSocketMap().entries()]){
                if(sock.id === socket.id){
                    removeUserSocket(userId);
                    console.log(`User disconnected: ${userId}`);
                    break;
                }
            }
        })
    })
}

export const getUserSocketMap = () => {
    return new Map(); 
};
