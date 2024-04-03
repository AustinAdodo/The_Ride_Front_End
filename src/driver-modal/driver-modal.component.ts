import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Payload} from "../payload/Payload";
import {NgForOf} from "@angular/common";

//ng add @angular/material
@Component({
  selector: 'app-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  standalone: true
})
export class DriverModalComponent {
  constructor(public dialogRef: MatDialogRef<DriverModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Payload) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  callDriver(phoneNumber: string): void {
    console.log(`Calling ${phoneNumber}...`);
    this.dialogRef.close();
  }

  getRatingArray() {
    return Array(Math.round(this.data.rating)).fill(0).map((x, i) => i);
  }
}

