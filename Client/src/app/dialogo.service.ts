import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const URL = 'ws://localhost:8001/';

export interface Message {
	author: string,
	message: string
}

@Injectable()
export class DialogoService {
	public messages: Subject<String>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<String>>wsService
			.connect(URL).onErrorResumeNext(wsService.connect(URL))
			.map((response: MessageEvent): String => {
				return response.data;
			});
	}
}