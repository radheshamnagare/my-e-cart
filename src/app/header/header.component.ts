import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { itemCategoryNavigation } from '../common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  listOfCategory: any = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  
  

  
}
