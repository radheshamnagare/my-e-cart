import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItems } from '../cart-items';
import { baseUrl } from '../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listOfProducts: any = [];
  listOfCategory: any = [];
  cartData: any = [];
  
  @Output()
  productCategory: any;
  constructor(private apiService: ProductService,  private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    try {
      this.productCategory = "all";
    } catch (error) {
      console.log(error)
    }
  }
  
}
