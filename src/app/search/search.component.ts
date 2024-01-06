import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  
 @Output()
  onSearchProduct: any = new EventEmitter<string>();
  productName: any;
  constructor() {
    
  }
  ngOnInit(): void {
    
  }

  searchProduct() {
    try {
      this.onSearchProduct.emit(this.productName);
    } catch (error) {
      console.log(error);
    }
  }
}
