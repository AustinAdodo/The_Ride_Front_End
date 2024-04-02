import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {NgIf} from "@angular/common";
import {FormExtension} from "../Extensions/FormExtension";

@Component({
  selector: 'app-create-driver',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent {
  driver: string = "Driver";
  hidePassword: boolean = true;
  driverForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    carColor: new FormControl('', Validators.required),
    carBrand: new FormControl('', Validators.required),
    Usertype: new FormControl('Driver'),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: FormExtension.confirmPasswordValidator('password', 'confirmPassword')});

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    const baseUrl = environment.baseUri;
    const addPersonUrl = `${baseUrl}/signup`;

    if (this.driverForm.valid) {
      this.http.post(addPersonUrl, this.driverForm.value).subscribe({
        next: (response) => {
          console.log('Driver added successfully', response);
          this.driverForm.reset();
        },
        error: (error) => console.error('Error adding driver:', error)
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
