import { Injectable } from '@angular/core';
import { Category, CreateProductDTO, Product, UpdateProductDto } from '../models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, map, retry } from 'rxjs'
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart : Product[] = []
  private myCart = new BehaviorSubject<Product[]>([])
  // patron observador
  myCart$ = this.myCart.asObservable()

  apiUrl = `${environment.API_URL}/api/`
  
  constructor(private http : HttpClient) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    
    return this.http.get<Product[]>(this.apiUrl+'products', { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getAllCategories(){
    return this.http.get<Category[]>(this.apiUrl+'categories')
  }

  getByCategory(id : string , limit : number , offset : number){
    let params = new HttpParams();
    if( limit && offset !== null){
      console.log("entro if")
      params = params.set('limit' , limit)
      params = params.set('offset' , offset)
      console.log("paramas : " , params)
    }
    return this.http.get<Product[]>(`${this.apiUrl}categories/${id}/products` , {params})
  }


  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl+'products')
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
    return this.http.get<Product>(`${this.apiUrl}products/${id}`)
  }

  createProduct(dto : CreateProductDTO){
    return this.http.post<Product>(this.apiUrl , dto)
  }

  update(id : string , dto : UpdateProductDto ){
    // return this.http.put(`${this.apiUrl}/${id}` , dto ); // enviar todo el producto
    return this.http.put<Product>(`${this.apiUrl}products/${id}` , dto); // enviar solo lo que se quiere modificar
  }
}
