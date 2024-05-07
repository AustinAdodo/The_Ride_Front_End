import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormExtension {
  static confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup; // Cast the AbstractControl to FormGroup
      const controlToCompare = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!controlToCompare || !matchingControl) {
        // Optionally, handle the error of controls not being found
        return null; // or return an error object if necessary
      }

      if (controlToCompare.value !== matchingControl.value) {
        matchingControl.setErrors({notMatched: true});
        return {notMatched: true}; // Return an error object
      } else {
        matchingControl.setErrors(null);
        return null; // Indication that there is no error
      }
    };
  }
}
