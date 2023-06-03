import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PopUpSignComponent } from '../pop-up-sign/pop-up-sign.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  tweets = [];
  dialogref;
  constructor(private authservice: AuthService, private dialog: MatDialog) {}
  LoginIn() {
    this.dialogref = this.dialog.open(PopUpSignComponent);
  }

  LoginWithGoogle() {
    this.authservice.GoogleAuth();
  }
}
