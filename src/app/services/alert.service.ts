import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import {
  MatDialog, 
  MatDialogRef
} from '@angular/material/dialog'; 

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  dialogRef!: MatDialogRef<AlertComponent, any>;

  constructor(public dialog: MatDialog) { }

  open(message: any) {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(AlertComponent, {
      data: message,
      disableClose: true,
      panelClass: 'app-dialog'
    });

    
  }

  afterClose(){
    return this.dialogRef.afterClosed()
  }

  close() {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
