import { BindingPipe } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgModel, Form } from '@angular/forms';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  onSubmit(f: any) {
    console.log(f.value);
  }
}
