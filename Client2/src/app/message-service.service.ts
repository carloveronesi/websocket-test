import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ConnectServiceService } from './connect-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageServiceService {
  public messages: Subject<String>;
/*
  constructor(connService : ConnectServiceService) {
    this.messages = <Subject<String>>connService
			.ServiceConnection()
			.map((response: MessageEvent): String => {
				return response.data;
			});
  }
  */

}
