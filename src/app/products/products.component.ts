import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../service/product.service';
import { baseUrl, itemCategoryNavigation } from '../common';
import { ActivatedRoute } from '@angular/router';
import { CartItems } from '../cart-items';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listOfProducts: any = [];
  @Input()
  category: any;
  cartData: any = [];

  constructor(private apiService: ProductService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    if (this.category != undefined && this.category.length > 0) {
      this.getCategoryProduct(this.category);
    } else {
      this.route.params.subscribe(params => {
        this.category = params['id'];
        this.getCategoryProduct(this.category);
      });
    }
  }

  keywordFoundInProductCategoty(cartSearch:any) {
    try {
      for (let item of this.apiService.category){
        if (item.trim() == cartSearch)
          return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  getCategoryProduct(category: any) {
    try {
      if (category == "all") {
        this.getAllProducts().then((listOfProd)=> {
          this.listOfProducts = listOfProd;
        })
      } else if (this.keywordFoundInProductCategoty(category)){
        this.getCategorywiseProduct(category).then((listOfProd) => {
          this.listOfProducts = listOfProd;
        });
      } else {
        this.getAllProducts().then((listOfProducts) => {
          this.getFilterProduct(listOfProducts, category).then((filterProduct) => {
            this.listOfProducts = filterProduct;
          })
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  getCategorywiseProduct(category:any):Promise<any> {
    let listOfProducts:any=[]
    try {
      let url = baseUrl + itemCategoryNavigation + "/" + category;
      this.apiService.get(url).subscribe((responseBody) => {
        listOfProducts = responseBody;
      })
    } catch (error) {
      console.log(error)
    }
    return new Promise(resolve => setTimeout(() => {
      resolve(listOfProducts);
    },1000));
  }
  getFilterProduct(products: any[],keyword:any) :Promise<any>{
    let filterProduct:any = [];
    try {
      filterProduct = products.filter((prod) => {
        return prod['title'].includes(keyword);
      })
      console.log(filterProduct);
    } catch (error) {
      console.log(error);
    }
    return new Promise(resolve => setTimeout(() => {
      resolve(filterProduct)
    },1000))
  }
  getAllProducts():Promise<any> {
    let listOfProducts: any = [];
    let url = "http://fakestoreapi.com/products"
    this.apiService.get(url).subscribe((responceBody: any) => {
      listOfProducts = responceBody;
    })
    return new Promise(resolve => setTimeout(() => {
      resolve(listOfProducts);
    },1000));
  }
  getDiscountPrice(price: number) {
    return price - (price * 35 / 100)
  }

  addItemToCart(productId: any) {
    try {
      if (!this.apiService.productInCart(productId)) {
        let productUrl = "http://fakestoreapi.com/products/" + productId;
        this.apiService.get(productUrl).subscribe((responseBody) => {
          this.apiService.addToCart(new CartItems(responseBody.id, responseBody.title, responseBody.price, responseBody.description, responseBody.image, responseBody.rating, 1));
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSearchFilter(value: any) {
    try {
      alert(value);
    } catch (error) {
      console.log(error);
    }
  }

  
}
