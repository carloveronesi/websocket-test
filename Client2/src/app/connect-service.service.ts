import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable()
export class ConnectServiceService {
  socket;
  URL = 'ws://localhost:8001/';

  constructor() {
    
    this.connect()
  }

  connect() {

    this.socket = new ReconnectingWebSocket(this.URL);
      console.log(this.socket.URL);
    

    this.socket.onopen = function () {
      console.log('Opened connection ');
      this.socket.send("Prova");
    }

    // When data is received
    this.socket.onmessage = function (event) {
      //Stampo messaggio ricevuto
      console.log(event.data);
    }

    // A connection could not be made
    this.socket.onerror = function (event) {
      console.log("Errore");
      //console.log(event);
    }

    // A connection was closed
    this.socket.onclose = function () { //Sarebbe: this.socket.onclose = function(code, reason) {
      console.log("Connessione chiusa");
      //console.log(code, reason);
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
