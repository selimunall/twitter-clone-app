import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { PopUpCreateComponent } from '../pop-up-create/pop-up-create.component';
@Component({
  selector: 'app-pop-up-sign',
  templateUrl: './pop-up-sign.component.html',
  styleUrls: ['./pop-up-sign.component.css'],
})
export class PopUpSignComponent {
  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<PopUpSignComponent>,
    private dialog: MatDialog
  ) {}

  closedialog() {
    this.dialogRef.close();
  }

  SignInGoogle() {
    this.dialogRef.close();
    this.auth.GoogleAuth();
  }
  singUp() {
    this.dialogRef.close();
    this.dialog.open(PopUpCreateComponent);
  }
}
