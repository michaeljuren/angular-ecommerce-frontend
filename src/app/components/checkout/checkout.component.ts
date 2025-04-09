import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

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

  creditCardMonths: number[] = []
  creditCardYears: number[] = []

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService) { }

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
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("Start month: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    )
    // populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    )


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

  handleMonthsandYears() {
    const creditCardFormGroup = this.checkOutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    )
  }
}
