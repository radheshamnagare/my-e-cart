import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { itemCategoryNavigation } from './common';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'products',
    component:HomeComponent
  },
  {
    path: 'cart',
    component:CartComponent
  },
  {
    path: itemCategoryNavigation+"/:id",
    component:ProductsComponent
  },
  {
    path: itemCategoryNavigation + "/:id"+`1`,
    component: ProductsComponent
  },
  {
    path: 'contact-us',
    component:ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
