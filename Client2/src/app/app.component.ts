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

  constructor() {}
  
  

  sendMsg() {
		console.log('Sending message to server: ', this.message);
		//this.socket.send(this.message);
	}
}
