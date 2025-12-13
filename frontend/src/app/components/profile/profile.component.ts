import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileform!: FormGroup;
  selectedFile!: File;
  imagePreview: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileComponent>,
    private cs: CommonService
  ) {}

  ngOnInit() {
    this.profileform = this.fb.group({
      phone: [this.data?.phone || null],
      email: [this.data?.email || null],
      imageUrl: [this.data?.imageUrl || null],
    });
    if (this.data?.imageUrl) {
      this.imagePreview = this.data.imageUrl;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('phone', this.profileform.value.phone);
    formData.append('email', this.profileform.value.email);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.cs
      .patch('employee', `${this.data.userId}`, this.profileform.value)
      .subscribe((res) => {
        this.dialogRef.close(res);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
