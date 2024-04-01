import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Client} from "stompjs";
import {Payload} from "../payload/Payload";
import {environment} from "../environments/environment";

// npm install --save-dev @types/stompjs
//npm install --save-dev @types/sockjs-client

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private _stompClient!: Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = environment.websocketurl;
    const ws = new SockJS(serverUrl);
    this._stompClient = Stomp.over(ws);
    this._stompClient.connect({}, () => {
     this.subscribeToDriverUpdates();
     this.subscribeToUserOrSystemMessages();
    });
  }

  private subscribeToDriverUpdates() {
    this._stompClient.subscribe('/topic/driverUpdates', (message: { body: string }) => {
      if (message.body) {
        const response = JSON.parse(message.body);
        const driverPayload = this.mapToDriverPayload(response);
        if (driverPayload.hasAccepted) {
          // Now, driverPayload contains your mapped data and can be used accordingly
          // For example, you could pass this payload to a method that displays the modal:
          this.showDriverModal(driverPayload);
        }
      }
    });
  }

  private subscribeToUserOrSystemMessages() {
    this._stompClient.subscribe('/topic/UserOrSystemMessages', (message: { body: string }) => {
      if (message.body) {
        const response = JSON.parse(message.body);
        // Handle user or system messages
        // Example: this.handleUserOrSystemMessage(response);
      }
    });
  }

  private mapToDriverPayload(data: Payload): Payload {
    const payload = new Payload();
    payload.name = data.name || "Driver";
    payload.phoneNumber = data.phoneNumber || "0501";
    payload.rating = data.rating || 5.0;
    payload.hasAccepted = data.hasAccepted || true;
    payload.message = data.message || "Your Driver is on his way";
    payload.photoUrl = data.photoUrl || '';
    return payload;
  }

  private showDriverModal(driverPayload: Payload) {
    // Modal display logic goes here
    // Example: console.log(`Driver ${driverPayload.name} is on the way.`);
  }

  public sendDriverAcceptance(driverPayload: Payload) {
    const message = `Driver is on ${driverPayload.sex === 'male' ? 'his' : 'her'} way`;
    this._stompClient.send('/app/acceptTrip', {}, JSON.stringify({ ...driverPayload, message }));
  }
}
