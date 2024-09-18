import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/context";
import { BaseContextProps } from "../common";
import { EventPayload } from "./domain";
import { socket } from "./infra/socket_client";

type WebsocketContextData = {
  connectTo: (channelId: string) => string | undefined;
  emit: (content: string) => void;
  activeChannelId: string | undefined;
  receivedEvents: EventPayload[];
};

export const WebsocketContext = createContext<WebsocketContextData>(
  {} as WebsocketContextData
);

export function WebsocketProvider({ children }: BaseContextProps) {
  const { user } = useAuth();
  const [activeChannelId, setActiveChannelId] = useState<string>();
  const [receivedEvents, setReceivedEvents] = useState<EventPayload[]>([]);

  function emit(content: string) {
    console.log(`Emitting ${content} to ${activeChannelId}...`);
    socket.emit("events", {
      channelId: activeChannelId,
      senderId: user?._id,
      content: content,
    });
  }

  function connectTo(channelId: string): string | undefined {
    if (channelId == activeChannelId) {
      console.log(`User is already connected to channel ${channelId}`);
      return channelId;
    }

    if (activeChannelId) {
      console.log(
        `Socket disconnecting from previous active channel ${channelId}...`
      );
      socket.off(activeChannelId, onEvents);
      setActiveChannelId(undefined);
    }

    console.log(`Socket connecting to channel ${channelId}...`);
    if (!socket.connected) {
      socket.connect();
    }

    setActiveChannelId(channelId);
    socket.on(channelId, onEvents);
    return channelId;
  }

  function onConnect() {
    console.log("Socket connected!");
  }

  function onDisconnect() {
    console.log("Socket disconnected.");
  }

  function onEvents(data: EventPayload) {
    console.log(
      `[WebsocketProvider] Channel ${activeChannelId} received event:`,
      data
    );
    setReceivedEvents([...receivedEvents, data]);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (activeChannelId) socket.off(activeChannelId, onEvents);
    };
  }, []);

  const value = { connectTo, emit, activeChannelId, receivedEvents };

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  );
}

export const useWebsocket = () => useContext(WebsocketContext);
