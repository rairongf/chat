"use client";

import { io, Socket } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:80';

export type IStocketClient = Socket;

export const socket = io(URL, {
  autoConnect: false,
});