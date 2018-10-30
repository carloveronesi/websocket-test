import { Component } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  URL = 'ws://localhost:8001/';
  serverMsg: String = null;
  private message = "Hi server!";

  socket = new ReconnectingWebSocket(this.URL);

  constructor() {
    this.start()
  }
  
  start(){
    this.socket.onopen = function() {
      console.log('Opened connection ');
    }
    
    // When data is received
    this.socket.onmessage = function(event) {
      this.serverMsg = event.data;
      //Stampo messaggio ricevuto
      alert(event.data);
    }
    
    // A connection could not be made
    this.socket.onerror = function(event) {
      console.log("Errore");
      //console.log(event);
    }
    
    // A connection was closed
    this.socket.onclose = function() {    //Sarebbe: this.socket.onclose = function(code, reason) {
      console.log("Connessione chiusa");
      //console.log(code, reason);
    }
  }

  sendMsg() {
		console.log('Sending message to server: ', this.message);
		this.socket.send(this.message);
	}
}
