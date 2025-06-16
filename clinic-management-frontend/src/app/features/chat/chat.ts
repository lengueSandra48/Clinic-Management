// src/app/features/chat/chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, ChatMessage } from '../../core/services/chat.service'; // Adjust path
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: false, // Set to true if using standalone components
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})

export class Chat implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  // You'd get the actual user ID and name from your authentication service
  currentUser = { id: 'doctor123', name: 'Dr. John Doe' };
  currentRoom = 'clinic-general'; // Example: a general chat room

  private messagesSubscription!: Subscription;
  private notificationsSubscription!: Subscription;
  private onlineUsersSubscription!: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Join the general chat room
    this.chatService.joinRoom(this.currentRoom);

    // Subscribe to messages
    this.messagesSubscription = this.chatService.getMessages().subscribe(msg => {
      this.messages.push(msg);
      // Optional: scroll to bottom of chat window
      this.scrollToBottom();
    });

    // Subscribe to notifications
    this.notificationsSubscription = this.chatService.getNotifications().subscribe(notification => {
      console.log('Received notification:', notification);
      alert(`New Notification: ${notification.message}`); // Replace with a proper notification display
    });

    // Subscribe to online users (if your backend emits this)
    this.onlineUsersSubscription = this.chatService.getOnlineUsers().subscribe(users => {
      console.log('Online users:', users);
      // Update your UI to show online users
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const chatMessage: ChatMessage = {
        senderId: this.currentUser.id,
        senderName: this.currentUser.name,
        message: this.newMessage,
        timestamp: new Date(),
        roomId: this.currentRoom // Or receiverId for private chat
      };
      this.chatService.sendMessage(chatMessage);
      this.newMessage = ''; // Clear input
    }
  }

  private scrollToBottom(): void {
    // Implement scroll logic for your chat display area
    // This typically involves getting a reference to the chat messages container
    // and setting its scrollTop property.
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
    this.notificationsSubscription?.unsubscribe();
    this.onlineUsersSubscription?.unsubscribe();
    this.chatService.leaveRoom(this.currentRoom); // Leave chat room on destroy
  }
}