import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { TrendSideComponent } from './trend-side/trend-side.component';
import { FlowComponent } from './flow/flow.component';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    MainComponent,
    TrendSideComponent,
    FlowComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    AppComponent,
    AsideComponent,
    MainComponent,
    TrendSideComponent,
    FlowComponent,
  ],
})
export class AppModule {}
