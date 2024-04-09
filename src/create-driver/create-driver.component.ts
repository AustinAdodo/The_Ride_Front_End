import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {NgIf} from "@angular/common";
import {FormExtension} from "../Extensions/FormExtension";
import {Router} from "@angular/router";
import {DriverService} from "../services/DriverService";
import {UserDataPayload} from "../payload/UserDataPayload";

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
  private _driverService: DriverService;

  driverForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('',),
    sex: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('',),
    address: new FormControl('', ),
    photograph: new FormControl('',),
    carColor: new FormControl('',),
    carBrand: new FormControl('',),
    Usertype: new FormControl('Driver'),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },
    {validators: FormExtension.confirmPasswordValidator('password', 'confirmPassword')});

  constructor(private http: HttpClient, private router: Router, driverService: DriverService) {
    this._driverService = driverService;
  }

  onSubmit() {
    const formValues = this.driverForm.value;
    const NewDriver = new UserDataPayload({
      name: `${formValues.firstName} ${formValues.middleName} ${formValues.lastName}`,
      firstName: formValues.firstName || "",
      email: formValues.email || "",
      lastName: formValues.lastName || "",
      middleName: formValues.middleName || "",
      phoneNumber: formValues.phoneNumber || "",
      carBrand: formValues.carBrand || "",
      carColor: formValues.carColor || "",
      sex: formValues.sex || "",
      photoUrl: formValues.photograph || "",
      address: formValues.address || "",
    });

    const baseUrl = environment.baseUri;
    const addPersonUrl = `${baseUrl}/signup`;
    if (this.driverForm.valid) {
      this.http.post<UserDataPayload>(addPersonUrl, this.driverForm.value, {observe: 'response'}).subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log(`Driver added successfully status : ${response.status}`, NewDriver);
            this.driverForm.reset();
            // this.router.navigate(['/drive/home'], {queryParams: {data: JSON.stringify(response.body)}});
              this._driverService.setDriverData(NewDriver);
            this.router.navigate(['/drive/home']).then(success => {
              if (success) {
                console.log('Navigation to /drive/home successful');
              } else {
                console.log('Navigation to /drive/home failed');
              }
            }).catch(error => {
              console.error('Navigation error:', error);
            });
          }
        },
        error: (error) => console.error('Error adding driver:', error)
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
