import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthModule } from '@auth0/auth0-angular';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { AuthPathGuardService } from './services/auth-path-guard.service';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptor} from './services/auth-interceptor.service';

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthPathGuardService]},
  {path: '401', component: NotAuthorizedComponent},
  {path: 'members', component: MembersPageComponent, canActivate: [AuthPathGuardService]},
  {path: 'login', component: LoginStatusComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginStatusComponent,
    MembersPageComponent,
    NotAuthorizedComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain:'DOMAIN_NAME FROM AUTH0',
      clientId:'CLIENT_ID FROM AUTH0',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/login',
        audience: 'https://my-api.test.com'
      }
    })
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
    AuthPathGuardService,
    {provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
