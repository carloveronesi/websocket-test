import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { DialogoService } from './dialogo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, DialogoService ]
})
export class AppComponent {
	serverMsg: String = null;

	constructor(private dialogoService: DialogoService) {
		dialogoService.messages.subscribe(msg => {			
      this.serverMsg = msg;
		});
	}

  private message = "Hi server!";

  sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.dialogoService.messages.next(this.message);
	}

}