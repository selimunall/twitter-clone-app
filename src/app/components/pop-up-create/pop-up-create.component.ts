import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { PopUpSignComponent } from '../pop-up-sign/pop-up-sign.component';

@Component({
  selector: 'app-pop-up-create',
  templateUrl: './pop-up-create.component.html',
  styleUrls: ['./pop-up-create.component.css'],
})
export class PopUpCreateComponent {
  username;
  password;
  email;
  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<PopUpCreateComponent>,
    private dialog: MatDialog
  ) {}

  closedialog() {
    this.dialogRef.close();
  }

  SignInGoogle() {
    this.dialogRef.close();
    this.auth.GoogleAuth();
  }

  createAccount() {
    this.dialogRef.close();
    this.auth.RegisterUser(this.email, this.password, this.username);
  }

  loginIn() {
    this.dialogRef.close();
    this.dialog.open(PopUpSignComponent);
  }
}
