import app from "./app";
import { setSocketServer } from "./utils/socket";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT } from "./config/constants";
import { corsOptions } from "./config/corsOptions";
import { setUpChatSocket } from "./sockets/chat.socket";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: corsOptions
});

setSocketServer(io);
setUpChatSocket(io);

httpServer.listen(PORT, () => {
    console.log(`🎉 Server is running on port ${PORT}`);
});