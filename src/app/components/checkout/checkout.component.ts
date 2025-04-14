import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';
import { CartService } from '../../services/cart.service';
import { CheckOutService } from '../../services/check-out.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

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

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = []
  billingAddressStates: State[] = []


  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckOutService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        city:  new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        state:  new FormControl('',
          [Validators.required]),
        country:  new FormControl('',
          [Validators.required]),
        postalCode:  new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        city:  new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        state:  new FormControl('',
          [Validators.required]),
        country:  new FormControl('',
          [Validators.required]),
        postalCode:  new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',
          [Validators.required]),
        nameOnCard:  new FormControl('',
          [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]{3}$')]),
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("Start month: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
    // populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );

    // populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => this.countries = data
    );


    this.reviewCartDetails();
  }


  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

     // get customer details from checkout form
     get firstName() {return this.checkOutFormGroup.get('customer.firstName'); }
     get lastName() {return this.checkOutFormGroup.get('customer.lastName'); }
     get email() {return this.checkOutFormGroup.get('customer.email'); }

     // get shipping address details from checkout form
     get shippingAddressStreet() {return this.checkOutFormGroup.get('shippingAddress.street');}
     get shippingAddressCity() {return this.checkOutFormGroup.get('shippingAddress.city');}
     get shippingAddressState() {return this.checkOutFormGroup.get('shippingAddress.state');}
     get shippingAddressPostalCode() {return this.checkOutFormGroup.get('shippingAddress.postalCode');}
     get shippingAddressCountry() {return this.checkOutFormGroup.get('shippingAddress.country');}

     // get billing address details from checkout form
     get billingAddressStreet() {return this.checkOutFormGroup.get('billingAddress.street');}
     get billingAddressCity() {return this.checkOutFormGroup.get('billingAddress.city');}
     get billingAddressState() {return this.checkOutFormGroup.get('billingAddress.state');}
     get billingAddressPostalCode() {return this.checkOutFormGroup.get('billingAddress.postalCode');}
     get billingAddressCountry() {return this.checkOutFormGroup.get('billingAddress.country');}

    // get Credit Card details from checkout form
    get creditCardType() {return this.checkOutFormGroup.get('creditCard.cardType');}
    get creditCardNameonCard() {return this.checkOutFormGroup.get('creditCard.nameonCard');}
    get creditCardNumber() {return this.checkOutFormGroup.get('creditCard.cardNumber');}
    get creditCardSecurityCode() {return this.checkOutFormGroup.get('creditCard.securityCode');}


  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkOutFormGroup.invalid) {
      console.log("The checkout form is invalid");
      this.checkOutFormGroup.markAllAsTouched();
      return;
    }


    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkOutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkOutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress)).state;
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress)).country;
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkOutFormGroup.controls['billingAddress'].value;
    const billingAddressState: State = JSON.parse(JSON.stringify(purchase.billingAddress)).state;
    const billingAddressCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress)).country;
    purchase.billingAddress.state = billingAddressState.name;
    purchase.billingAddress.country = billingAddressCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via checkoutService
    console.log(`purchase: ${JSON.stringify(purchase)}`);
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          console.log(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);
          alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset form data
    this.checkOutFormGroup.reset();

    // navigate back to the product list page
    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress($event: Event) {
    const input = $event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      this.checkOutFormGroup.controls['billingAddress'].
          setValue(this.checkOutFormGroup.controls['shippingAddress'].value)

        // bug fix for states
        this.billingAddressStates = this.shippingAddressStates;

    }
    else {
      this.checkOutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      this.billingAddressStates = [];
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

  getStates(formGroupName: string) {
    const formGroup = this.checkOutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`The country code is: ${countryCode}`);
    console.log(`The country name is: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}
