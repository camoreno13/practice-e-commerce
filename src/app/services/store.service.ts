import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDto } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart : Product[] = []
  private myCart = new BehaviorSubject<Product[]>([])
  // patron observador
  myCart$ = this.myCart.asObservable()

  apiUrl = `${environment.API_URL}/api/products`
  
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

  createProduct(dto : CreateProductDTO){
    return this.http.post<Product>(this.apiUrl , dto)
  }

  update(id : string , dto : UpdateProductDto ){
    // return this.http.put(`${this.apiUrl}/${id}` , dto ); // enviar todo el producto
    return this.http.put<Product>(`${this.apiUrl}/${id}` , dto); // enviar solo lo que se quiere modificar
  }
}
