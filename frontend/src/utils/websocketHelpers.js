import { WS_BASE } from "./constants";

export class InterviewWebSocket {
    constructor(roomName) {
        const token = localStorage.getItem("access_token");
        this.url = `${WS_BASE}/interview/${roomName}/?token=${encodeURIComponent(token)}`;
        this.socket = null;

        this.onMessage = null;
        this.onClose = null;
        this.onOpen = null;
        this.onError = null;
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket Connected");
            this.onOpen?.();
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.onMessage?.(data);
        };

        this.socket.onclose = () => {
            console.log("Socket Closed");
            this.onClose?.();
        };

        this.socket.onerror = (event) => {
            console.error("WebSocket Error:", event);
            this.onError?.(event);
        };
    }

    send(payload) {
        if (
            this.socket &&
            this.socket.readyState === WebSocket.OPEN
        ) {
            this.socket.send(
                JSON.stringify(payload)
            );
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}