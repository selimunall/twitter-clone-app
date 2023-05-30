import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { TrendSideComponent } from './components/trend-side/trend-side.component';
import { FlowComponent } from './components/flow/flow.component';
import { MessagesComponent } from './components/messagec/messages.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { enviroments } from 'src/environments/firebase.env';
import { AuthComponent } from './components/auth/auth.component';
import { UserComponent } from './components/user/user.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PopUpSignComponent } from './components/pop-up-sign/pop-up-sign.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    MainComponent,
    TrendSideComponent,
    FlowComponent,
    MessagesComponent,
    AuthComponent,
    UserComponent,
    PopUpSignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(enviroments.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
