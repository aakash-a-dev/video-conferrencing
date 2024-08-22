import express from 'express'

const { join } = require('node:path');
const { Server } = require('socket.io');

import {Socket} from "socket.io";
import http from "http";
import { UserManager } from './managers/UserManager';

const app = express();
const server = http.createServer(http);
const io = new Server(server, {
  cors:{
    origin: "*"
  }
});

const userManager= new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName",socket);
  socket.on("disconnect", ()=>{
    userManager.removeUser(socket.id);
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});