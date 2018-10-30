import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';

import { MessageServiceService } from './message-service.service';
import { ConnectServiceService } from './connect-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [MessageServiceService, ConnectServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
