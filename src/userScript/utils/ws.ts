import { calculateBet } from "../bloxflip/bet.js";
import { config } from "./config.js";
import { Logger } from "./logger.js";

let bfWs: WebSocket;

async function connectWs() {
    bfWs = new WebSocket("wss://ws.bloxflip.com/socket.io/?transport=websocket");

    bfWs.addEventListener("message", async (event) => {
        if (event.data.charAt(0) == "0") {
            if (config.rain.enabled) bfWs.send("40/chat,");
            bfWs.send("40/crash,");
        }

        if (event.data == "40/crash") {
            bfWs.send(`42/crash,["auth","${config.auth}"]`);
            Logger.info("WS", "Connected to WebSocket");
            console.log("──────────────────────────────────");
            await calculateBet(true);
        }
    });
}

export { connectWs, bfWs };
