import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/context";
import { BaseContextProps } from "../common";
import { socket } from "./infra/socket_client";

type WebsocketContextData = {
  connectTo: (channelId: string) => string | undefined;
  emit: (content: string) => void;
  activeChannelId: string | undefined;
};

export const WebsocketContext = createContext<WebsocketContextData>(
  {} as WebsocketContextData
);

export function WebsocketProvider({ children }: BaseContextProps) {
  const { user } = useAuth();
  const [activeChannelId, setActiveChannelId] = useState<string>();

  function emit(content: string) {
    console.log(`Emitting ${content} to ${activeChannelId}...`);
    socket.emit("events", {
      channelId: activeChannelId,
      senderId: user?._id,
      content: content,
    });
  }

  function connectTo(channelId: string): string | undefined {
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
    socket.on(channelId, onEvents);
    setActiveChannelId(channelId);
    socket.emit("join_channel", {
      channelId: channelId,
      senderId: user?._id,
    });
    return channelId;
  }

  function onConnect() {
    console.log("Socket connected!");
  }

  function onDisconnect() {
    console.log("Socket disconnected.");
  }

  function onEvents(data) {
    console.log(`Channel ${activeChannelId} received event: ${data}`);
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

  return (
    <WebsocketContext.Provider value={{ connectTo, emit, activeChannelId }}>
      {children}
    </WebsocketContext.Provider>
  );
}

export const useWebsocket = () => useContext(WebsocketContext);
