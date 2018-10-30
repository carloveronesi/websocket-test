import { Component, OnInit } from '@angular/core';
import { ConnectServiceService } from './connect-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  serverMsg: String = null;
  private message = "Hi server!";
  ioConnection: any;

  constructor(private connService : ConnectServiceService) {
  }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.connService.initSocket();

    this.ioConnection = this.connService.onMessage()
      .subscribe((message: String) => {
        this.serverMsg = message;
      });
  }
  
  sendMsg() {
		console.log('Sending message to server: ', this.message);
		//this.socket.send(this.message);
	}
}
