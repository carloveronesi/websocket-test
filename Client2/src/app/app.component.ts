import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectServiceService } from './connect-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  serverMsg: String = null;
  private message = "Hi server!";
  ioConnection: any;

  constructor(private connService : ConnectServiceService) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  ngOnDestroy() {
    //Unsubscribing
    this.ioConnection.unsubscribe();
  }

  //Initializing socket and subscribing
  private initIoConnection(): void {
    this.connService.initSocket();

    this.ioConnection = this.connService.onMessage()
      .subscribe((message: String) => {
        this.serverMsg = message;
      });
  }
  
  //Send message to server
  sendMsg() {
		console.log('Sending message to server: ', this.message);
    this.connService.send(this.message);
  }
}
