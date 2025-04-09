import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  checkOutFormGroup!: FormGroup;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    })
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkOutFormGroup.get('customer')?.value)
  }

  copyShippingAddressToBillingAddress($event: Event) {
    const input = $event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      this.checkOutFormGroup.controls['billingAddress'].
          setValue(this.checkOutFormGroup.controls['shippingAddress'].value)
    }
    else {
      this.checkOutFormGroup.controls['billingAddress'].reset();
    }
  }
}
