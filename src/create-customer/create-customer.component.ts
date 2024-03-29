import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customer: string = "Customer";
  @Component({
    selector: 'create-user',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-driver.component.html',
    styleUrls: ['./create-driver.component.css']
  })
  UserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    carColor: new FormControl('', Validators.required),
    carName: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) {
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
        error: (error) => console.error('Error adding driver:', error)
      });
    }
  }
}
