import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Payload } from "../payload/Payload";
import { environment } from "../environments/environment";
import { AuthService } from './AuthService';

// Conditional import for net module
// let net;
// if (typeof window === 'undefined') {
//   net = require('net');
// }

@Injectable({
  providedIn: 'root',
})

/**
 * use npm install --save-dev @types/stompjs
 * npm install --save-dev @types/sockjs-client 
 * npm install @stomp/stompjs sockjs-client --save
 * 
 * WebSocketService
 * 
 * This service establishes and manages a WebSocket connection using @stomp/stompjs and SockJS.
 * It provides functionality for subscribing to topics, sending messages, and handling real-time 
 * updates for a customer-driver system.
 * 
 * WHY THE UPGRADE TO @stomp/stompjs AND sockjs-client WAS NECESSARY:
 * 
 * 1. **Modern and Actively Maintained**:
 *    - The `@stomp/stompjs` library is the modern implementation of the STOMP protocol for JavaScript.
 *    - Unlike the older `stompjs` library, it is actively maintained and optimized for modern web 
 *      development practices.
 * 
 * 2. **Compatibility**:
 *    - The previous implementation relied on the `net` module, which is specific to Node.js and 
 *      does not work in browser environments. This caused errors during builds and execution in 
 *      Angular applications targeting browsers.
 *    - The SockJS library provides a browser-compatible WebSocket fallback mechanism, ensuring 
 *      compatibility across different environments and browsers.
 * 
 * 3. **Improved API Design**:
 *    - `@stomp/stompjs` simplifies the connection and message-publishing process with modern APIs.
 *    - Methods like `publish` provide a cleaner, more intuitive way to send messages compared to 
 *      the deprecated `send` method.
 * 
 * 4. **Enhanced Features**:
 *    - Automatic reconnection support.
 *    - Built-in heartbeats to detect and handle inactive connections.
 *    - Better error handling and debugging tools.
 * 
 * BENEFITS OF USING @stomp/stompjs AND sockjs-client:
 * 
 * 1. **Cross-Browser Compatibility**:
 *    - SockJS ensures the WebSocket service works across all browsers, including those that do 
 *      not natively support WebSockets.
 *    - Provides fallbacks to other transport protocols (e.g., XHR-streaming) when WebSockets 
 *      are unavailable.
 * 
 * 2. **Lightweight and Performant**:
 *    - Focuses on lightweight implementation, minimizing overhead while adhering to WebSocket 
 *      protocol standards.
 *    - Uses fewer dependencies, making the service more reliable.
 * 
 * 3. **Reduced Dependency on Node.js-Specific Modules**:
 *    - Eliminates reliance on the `net` module, which is not supported in browser contexts.
 *    - Suitable for use in browser-based frameworks like Angular, ensuring smooth integration 
 *      without environment-specific errors.
 * 
 * 4. **Flexibility and Customization**:
 *    - Supports customizing connection parameters, headers, and message payloads.
 *    - Extensible and integrates seamlessly with modern frameworks and libraries.
 * 
 * BREAKDOWN OF THE WebSocketService CLASS:
 * 
 * - **Dependencies**:
 *   - `@stomp/stompjs`: STOMP client implementation for WebSocket communication.
 *   - `sockjs-client`: Provides a WebSocket fallback mechanism for browser compatibility.
 *   - `AuthService`: Provides authentication tokens for securing WebSocket connections.
 *   - `rxjs/Subject`: Manages real-time data streams and updates.
 * 
 * - **Key Features**:
 *   1. **Initialization**:
 *      - Establishes a WebSocket connection using SockJS and authenticates using a token.
 *      - Subscribes to various topics for real-time updates.
 * 
 *   2. **Subscriptions**:
 *      - `subscribeToSystemMessages`: Listens for system-wide announcements or notifications.
 *      - `subscribeToUserMessages`: Handles customer-related updates.
 *      - `subscribeToDriverUpdates`: Tracks driver actions and updates.
 * 
 *   3. **Publishing Messages**:
 *      - `sendDriverAcceptance`: Sends a driver's acceptance of a trip to the server.
 *      - `sendCustomerTripRequest`: Sends a customer's trip request to the server.
 * 
 *   4. **Message Handling**:
 *      - Parses incoming messages, maps payloads, and updates observables to propagate changes.
 * 
 * - **Real-Time Communication**:
 *   - This service enables seamless communication between customers, drivers, and the system,
 *     ensuring a responsive user experience.
 * 
 * HOW IT WORKS:
 * 
 * 1. When the service is initialized, it connects to the WebSocket server using the SockJS endpoint.
 * 2. It authenticates the connection using a token retrieved from `AuthService`.
 * 3. Subscriptions are created for various topics to listen for real-time updates.
 * 4. When an action occurs (e.g., a trip request or acceptance), it uses the `publish` method to 
 *    send messages to the server.
 * 
 * CONCLUSION:
 * 
 * By upgrading to `@stomp/stompjs` and `sockjs-client`, this service provides a modern, robust, 
 * and browser-compatible solution for real-time communication in Angular applications. It eliminates 
 * Node.js-specific dependencies, ensures compatibility with all major browsers, and offers a clean, 
 * maintainable API for managing WebSocket interactions.
 */

export class WebSocketService {
  private _stompClient!: Client;
  private userMessageSubject = new Subject<Payload>();
  private driverMessageSubject = new Subject<Payload>();
  public userUpdateMessages = this.userMessageSubject.asObservable();
  public driverUpdateMessages = this.driverMessageSubject.asObservable();

  constructor(private authService: AuthService) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const token = this.authService.getToken();
    const serverUrl = `${environment.webSocketUrl}?token=${token}`;
    const ws = new SockJS(serverUrl);

    this._stompClient = new Client({
      webSocketFactory: () => ws,
      debug: (msg: string) => console.log(msg),
    });

    this._stompClient.onConnect = () => {
      this.subscribeToDriverUpdates();
      this.subscribeToSystemMessages();
      this.subscribeToUserMessages();
    };

    this._stompClient.activate();
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
    this._stompClient.publish({
      destination: '/app/acceptTrip',
      body: JSON.stringify({...driverPayload}),
    });    
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
    this._stompClient.publish({
      destination: '/app/trip/Request',
      body: JSON.stringify({...userPayload}),
    });    
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
