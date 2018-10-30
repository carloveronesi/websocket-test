import { Injectable } from '@angular/core';

@Injectable()
export class ConnectServiceService {
  socket;
  URL = 'ws://localhost:8001/';

}
