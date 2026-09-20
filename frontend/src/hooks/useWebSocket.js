import { useEffect, useRef, useState, useCallback } from "react";
import { InterviewWebSocket } from "../utils/websocketHelpers";

export const useWebSocket = (roomName) => {

    const socketRef = useRef(null);

    const [connected, setConnected] = useState(false);

    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {

        if (!roomName) {

            return;
        }

        const socket = new InterviewWebSocket(
            roomName
        );

        socket.onOpen = () => {

            setConnected(true);
        };

        socket.onClose = () => {

            setConnected(false);
        };

        socket.onError = () => {

            setConnected(false);
        };

        socket.onMessage = (message) => {

            setLastMessage(message);
        };

        socket.connect();

        socketRef.current = socket;

        return () => {

            socket.close();
        };

    }, [roomName]);

    const send = useCallback((payload) => {

        socketRef.current?.send(payload);

    }, []);

    return {

        connected,

        lastMessage,

        send,
    };
};