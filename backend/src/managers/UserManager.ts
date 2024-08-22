import {Socket} from "socket.io"
import { RoomManager } from "./RoomManager";

let GLOBAL_ROOM_ID = 1;

export interface User{
    socket: Socket;
    name: String;
}

export class UserManager{
    private users: User[]
    private queue: string[];
    private roomManager: RoomManager;

    constructor(){
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager();
    }
    addUser(name: string, socket:Socket){
        this.users.push({
            name, socket
        })
        this.queue.push(socket.id);
        socket.send("lobby")
        this.clearQueue();
        this.initHandler(socket);
    }
    removeUser(socketId:string){
        const user = this.users.find(x => x.socket.id === socketId);
        this.users = this.users.filter(x => x.socket.id !== socketId);
        this.queue = this.queue.filter(x => x === socketId);
    }

    clearQueue(){
        if(this.queue.length < 2){
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.queue.pop());

        if(!user1 || !user2){
            return;
        }

        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }

    initHandler(socket:Socket){
        socket.on("offer", ({sdp, roomId}: {sdp:string, roomId:string})=>{
            this.roomManager.onOffer(roomId, sdp);
        })

        socket.on("answer", ({sdp, roomId}: {sdp:string, roomId:string})=>{
            this.roomManager.onAnswer(roomId, sdp);
        })
    }




    generate(){
        return GLOBAL_ROOM_ID++
    }
}