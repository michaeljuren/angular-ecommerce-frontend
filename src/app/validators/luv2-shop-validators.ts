import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

  // whitespace validation
  static notOnlyWhiteSpace(control: FormControl) : ValidationErrors | null {

    // check if string only has whitespaces
    if (control.value != null && control.value.trim().length === 0) {
      // invalid, return error
      return { 'notOnlyWhiteSpace': true };
    }
    else {
      // valid
      return null;
    }
  }
}
