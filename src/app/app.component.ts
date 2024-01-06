import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from './service/product.service';
import { Router } from '@angular/router';
import { itemCategoryNavigation } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Shopewise';
  listOfCategory: any = [];

  @Output()
  selectCategory: any="all";
  
  constructor(public apiService: ProductService,private router:Router) {  
  }
  ngOnInit(): void {
    try {
      this.getAllCategories();
    } catch (error) {
      console.log(error);
    }
  }

  searchProduct(value: any) {
    try {
      this.selectCategory = value;
      let link = ['/' + itemCategoryNavigation + '/' + value]
      this.router.navigate(link);
    } catch (error) {
      console.log(error);
    }
  }

  getAllCategories() {
    try {
      this.apiService.loadProductCategoryList();
    } catch (error) {
      console.log(error)
    }
  }

  goNavigation(product: any) {
    this.selectCategory = product;
    let link = ['/' + itemCategoryNavigation+'/'+product]
    this.router.navigate(link);
  }

  
  removeAllCartItem() {
    this.apiService.revomeAll()
  }

  removeCartItem(inx: any) {
    this.apiService.removeItem(inx);
  }
  
  gotoContactUs() {
    try {
      let link = ['/contact-us']
      this.router.navigate(link);
    } catch (error) {
      console.log(error);
    }
  }
}
