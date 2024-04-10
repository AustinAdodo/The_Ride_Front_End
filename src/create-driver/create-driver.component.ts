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
      address: new FormControl('',),
      photograph: new FormControl('',),
      carColor: new FormControl('',),
      VehiclePlateNumber: new FormControl('xx-yll3',),
      carModel: new FormControl('',),
      Usertype: new FormControl('Driver',),
      detectedUsertype: new FormControl('Driver',),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      TotalTrips: new FormControl(0,),
      Username: new FormControl('odia@example.com',),
      DateOfBirth: new FormControl(new Date('2024-06-01')),
      Category: new FormControl('Registered'),
      status: new FormControl('Active'),
      currentLongitude: new FormControl(3.111011111109),
      currentLatitude: new FormControl(6.001111223344),
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
      carModel: formValues.carModel || "",
      carColor: formValues.carColor || "",
      sex: formValues.sex || "",
      photoUrl: formValues.photograph || "",
      address: formValues.address || "",
      Usertype: formValues.Usertype || "",
    });

    const baseUrl = environment.baseUri;
    const addPersonUrl = `${baseUrl}/signup`;
    if (this.driverForm.valid) {
      this.http.post(addPersonUrl, this.driverForm.value, {observe: 'response'}).subscribe({
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
