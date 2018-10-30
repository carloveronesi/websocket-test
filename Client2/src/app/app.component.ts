import { Component } from '@angular/core';
import { MessageServiceService } from './message-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverMsg: String = null;
  private message = "Hi server!";

  constructor(msgService : MessageServiceService) {
    msgService.messages.subscribe(msg => {			
      this.serverMsg = msg;
		});
  }
  
  sendMsg() {
		console.log('Sending message to server: ', this.message);
		//this.socket.send(this.message);
	}
}
