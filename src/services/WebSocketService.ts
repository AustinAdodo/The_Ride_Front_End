import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Client} from "stompjs";
import {Subject} from 'rxjs';
import {Payload} from "../payload/Payload";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})

/**
 * npm install --save-dev @types/stompjs
 * npm install --save-dev @types/sockjs-client
 */
export class WebSocketService {
  private _stompClient!: Client;
  private userMessageSubject = new Subject<Payload>();
  private driverMessageSubject = new Subject<Payload>();
  public userUpdateMessages = this.userMessageSubject.asObservable();
  public driverUpdateMessages = this.driverMessageSubject.asObservable();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = environment.webSocketUrl;
    const ws = new SockJS(serverUrl);
    this._stompClient = Stomp.over(ws);
    this._stompClient.connect({}, () => {
      this.subscribeToDriverUpdates();
      this.subscribeToSystemMessages();
      this.subscribeToUserMessages();
    });
  }

  /**
   * Driver Actions
   */
  private subscribeToSystemMessages() {
    this._stompClient.subscribe('/topic/SystemMessages', (message: { body: string }) => {
      if (message.body) {
        const response = JSON.parse(message.body);
      }
    });
  }

  private subscribeToUserMessages() {
    this._stompClient.subscribe('/topic/customer', (stream) => {
      if (stream.body) {
        const responseJson = JSON.parse(stream.body);
        const payloadInstance = new Payload(responseJson);
        console.log("Successfully subscribed to topic /topic/customer")
        this.userMessageSubject.next(payloadInstance);
      }
    });
  }

  public sendDriverAcceptance(driverPayload: Payload) {
    driverPayload.topic = 'driverUpdates';
    this._stompClient.send('/app/acceptTrip', {}, JSON.stringify({...driverPayload}));
  }

  /**
   * User Actions
   */
  private subscribeToDriverUpdates() {
    this._stompClient.subscribe('/topic/driverUpdates', (message: { body: string }) => {
      if (message.body) {
        const response = JSON.parse(message.body);
        const driverPayload = this.mapToDriverPayload(response);
        if (driverPayload.hasAccepted) {
          this.driverMessageSubject.next(driverPayload);
        }
      }
    });
  }

  public sendCustomerTripRequest(userPayload: Payload) {
    userPayload.topic = 'customer';
    this._stompClient.send('/app/trip/Request', {}, JSON.stringify({...userPayload}));
  }

  /**
   * other Actions
   */
  private mapToDriverPayload(data: Payload): Payload {
    const payload = new Payload();
    payload.name = data.name || "Driver";
    payload.phoneNumber = data.phoneNumber || "0501";
    payload.rating = data.rating || 5.0;
    payload.hasAccepted = data.hasAccepted || true;
    payload.message = data.message || "No Message";
    payload.photoUrl = data.photoUrl || '';
    return payload;
  }

}
