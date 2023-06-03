import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-pop-up-sign',
  templateUrl: './pop-up-sign.component.html',
  styleUrls: ['./pop-up-sign.component.css'],
})
export class PopUpSignComponent {
  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<PopUpSignComponent>
  ) {}

  closedialog() {
    this.dialogRef.close();
  }

  SignInGoogle() {
    this.dialogRef.close();
    this.auth.GoogleAuth();
  }
}
