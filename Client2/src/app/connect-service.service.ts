import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable()
export class ConnectServiceService {
  socket;
  URL = 'ws://localhost:8001/';

  constructor() {
    this.socket = new ReconnectingWebSocket(this.URL);
    this.connect()
  }

  connect() {
    var prova = this.socket;

    prova.onopen = function () {
      console.log('Opened connection ');
      prova.send("Prova");
    }

    prova.onerror = function(event) {
      console.log("Errore");
      //console.log(event);
    }
  }
  
  //ServiceConnection
  public ServiceConnection(): Rx.Subject < MessageEvent > {
    let observable = Rx.Observable.create(
      (obs: Rx.Observer < MessageEvent > ) => {
        this.socket.onmessage = obs.next.bind(obs);
        this.socket.onerror = obs.error.bind(obs);
        this.socket.onclose = obs.complete.bind(obs);
        return this.socket.close.bind(this.socket);
      })
    let observer = {
      next: (data: Object) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
      }
    }
    return Rx.Subject.create(observer, observable);
  }
}
