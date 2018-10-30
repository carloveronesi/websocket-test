import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import ReconnectingWebSocket from 'reconnecting-websocket';

const URL = 'ws://localhost:8001/';

@Injectable()
export class ConnectServiceService {
  private socket;

  //Initializing webSocket
  public initSocket(): void {
    this.socket = new ReconnectingWebSocket(URL);
  }

  //Sending message
  public send(message: String): void {
    this.socket.send(message);
  }

  //Receiving message
  public onMessage(): Observable <String> {
    return Observable.create(observer=>{  
      this.socket.onmessage = (evt) => { 
          observer.next(evt.data);
      };
    })
  }

  /*public onEvent(event: Event): Observable < any > {
    return new Observable < Event > (observer => {
      this.socket.on(event, () => observer.next());
    });
  }*/
}