// src/app/core/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; // From ngx-socket-io library
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define your message structure (adjust as needed)
export interface ChatMessage {
  senderId: string;
  senderName: string;
  receiverId?: string; // Optional for private chats
  roomId?: string; // Optional for group chats
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) {
    // You can listen for connection/disconnection events here
    this.socket.on('connect', () => {
      console.log('Connected to chat server via Socket.IO!');
      // You might want to emit a 'userOnline' event here
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server.');
    });

    this.socket.on('error', (err: any) => {
      console.error('Socket.IO Error:', err);
    });
  }

  // --- Send Messages ---
  sendMessage(msg: ChatMessage): void {
    // 'message' is the event name the backend will listen for
    this.socket.emit('message', msg);
  }

  // For private messages
  sendPrivateMessage(msg: ChatMessage): void {
    this.socket.emit('privateMessage', msg);
  }

  // For joining/leaving rooms (e.g., clinic-wide chat, specific doctor's room)
  joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string): void {
    this.socket.emit('leaveRoom', roomId);
  }

  // --- Receive Messages ---
  getMessages(): Observable<ChatMessage> {
    // 'message' is the event name the backend will emit for new messages
    return this.socket.fromEvent<ChatMessage, any>('message').pipe(
      map(data => ({ ...data, timestamp: new Date(data.timestamp) })) // Ensure timestamp is Date object
    );
  }

  getPrivateMessages(): Observable<ChatMessage> {
    return this.socket.fromEvent<ChatMessage, any>('privateMessage').pipe(
      map(data => ({ ...data, timestamp: new Date(data.timestamp) }))
    );
  }

  // --- Real-time Notifications ---
  getNotifications(): Observable<any> {
    // 'notification' could be a generic event for real-time alerts
    return this.socket.fromEvent<any, any>('notification');
  }

  // You might also want an observable for online users list
  getOnlineUsers(): Observable<string[]> {
    return this.socket.fromEvent<string[], any>('onlineUsers');
  }
}