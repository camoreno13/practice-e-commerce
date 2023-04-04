import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart : Product[] = []
  private myCart = new BehaviorSubject<Product[]>([])
  // patron observador
  myCart$ = this.myCart.asObservable()

  apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'
  constructor(private http : HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl)
  }

  addProduct(product : Product){
    this.myShoppingCart.push(product)
    this.myCart.next(this.myShoppingCart)
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum , item ) => sum + item.price , 0)
  }

  getShoppingCart(){
    return this.myShoppingCart
  }

  getProduct(id : string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
}
