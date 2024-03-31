import {io} from 'socket.io-client';
import {createContext} from "react";

const socket = io('ws://localhost:4000');

export const socketContext = createContext(socket)

