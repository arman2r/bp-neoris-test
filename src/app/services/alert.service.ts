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
    //console.log('cual es el mensaje', this.dialogRef)
    if(this.dialogRef) {
      this.dialogRef.close(message);
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
