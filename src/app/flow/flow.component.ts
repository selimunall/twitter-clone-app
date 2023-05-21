import { Component } from '@angular/core';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
})
export class FlowComponent {
  Submit(from: any) {
    console.log(from.value);
  }
}
