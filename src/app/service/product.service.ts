import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItems } from '../cart-items';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartItemSubject = new BehaviorSubject<CartItems[]>([]);
  private listOfCategory: any = [];
  cartItems$ = this.cartItemSubject.asObservable();

  constructor(private http: HttpClient) { 
    const storedItems = localStorage.getItem("cartItems");
    this.cartItemSubject.next(storedItems ? JSON.parse(storedItems) : []);
  }
  

  get category() {
    return this.listOfCategory;
  }
  loadProductCategoryList() {
    try {
      let url = "http://fakestoreapi.com/products/categories";
      this.get(url).subscribe((responseBody) => {
        this.listOfCategory = responseBody;
      })
    } catch (error) {
      console.log(error)
    }
  }
  get(url: string):Observable<any> {
    return this.http.get(url);
  }

  addToCart(item: CartItems): void{
    const currentItems = this.cartItemSubject.value;
    const newItems = [...currentItems, item];
    this.cartItemSubject.next(newItems);
    localStorage.setItem("cartItem", JSON.stringify(newItems));
  }

  revomeAll() {
    const updatedItem: never[] = [];
    this.cartItemSubject.next([...updatedItem])
  }
  removeItem(inx:any) {
    try {
      let updatedItem: [] = this.allCartItems; 
      updatedItem.splice(inx, 1);
    } catch (error) {
      console.log(error);
    }
  }
  get totalCartItems() {
    let len = 0;
    this.cartItems$.subscribe(e => {
      len = e.length;
    })
    return len;
  }

  data:any
  get allCartItems() {
    this.cartItems$.subscribe(e => {
      this.data = e;
    })
    return this.data;
  }

  productInCart(productId: any) {
    let flag = false;
    let inx = -1;
    if (this.totalCartItems <= 0)
      return flag;
    this.cartItems$.subscribe(e => {
      for (let i = 0; i < e.length;i++){
        if (e[i].id === productId) {
          inx = i;
          flag = true;
          break;
        }
      }
    })
    if (inx >= 0) {
      this.cartItems$.subscribe(e => {
        e[inx].count += 1;
        })
      }
    return flag;
  }

  get subTotal() {
    let subtotal = 0;
    this.cartItems$.subscribe(e => {
      e.map(item => {
        subtotal += (item.price * item.count);
      })
    })
    return subtotal;
  }
}

