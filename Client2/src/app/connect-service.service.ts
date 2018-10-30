import {
  Injectable
} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {
  Observable
} from 'rxjs/Observable';
import {
  Observer
} from 'rxjs/Observer';

const URL = 'ws://localhost:8001/';

@Injectable()
export class ConnectServiceService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(URL);
  }

  public send(message: String): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable < String > {
    return new Observable < String > (observer => {
      this.socket.on('message', (data: String) => observer.next(data));
    });
  }

  /*public onEvent(event: Event): Observable < any > {
    return new Observable < Event > (observer => {
      this.socket.on(event, () => observer.next());
    });
  }*/
}