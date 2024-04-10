import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from '../environments/environment';
import {FormExtension} from "../Extensions/FormExtension";
import {NgIf} from "@angular/common";

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})

export class CreateCustomerComponent implements OnInit{
  hidePassword = true;

  UserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    sex: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    Usertype: new FormControl('Customer'),
    detectedUsertype: new FormControl('Customer',),
    password: new FormControl('', Validators.required),
    isOnlyMySexAllowed: new FormControl(''),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: FormExtension.confirmPasswordValidator('password', 'confirmPassword')});


  constructor(private http: HttpClient) {
  }

  ngOnInit() {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    const baseUrl = environment.baseUri;
    const addPersonUrl = `${baseUrl}/signup`;
    if (this.UserForm.valid) {
      this.http.post(addPersonUrl, this.UserForm.value).subscribe({
        next: (response) => {
          console.log('Driver added successfully', response);
          this.UserForm.reset();
        },
        error: (error) => console.error('Error adding user:', error)
      });
    }
  }

  // dropdownClick() {
  //   this.UserForm.get('isOnlyMySexAllowed')?.valueChanges.subscribe(value => {
  //     const booleanValue = value === 'true';
  //     // IMPORTANT: Directly updating the same control inside its valueChanges subscription
  //     // can lead to infinite loops. To prevent this, use {emitEvent: false} option.
  //     this.UserForm.get('isOnlyMySexAllowed')?.setValue(booleanValue, {emitEvent: booleanValue});
  //     console.log("Dropdown changed to boolean:", booleanValue);
  //   });
  // }
}
