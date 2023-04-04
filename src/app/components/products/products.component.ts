import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart : Product[] = []
  total : number = 0
  showProductDetail = false
  productChoosen : Product = {
    id : '',
    name : '',
    images :[],
    price : 0,
    title : '',
    description : '',
    category : {
      id : '',
      name : ''
    }
  }

  public productos: Product[] = []

  constructor(private storeService : StoreService) { 
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.storeService.getAllProducts()
    .subscribe(data => {
      this.productos  = data
      console.log("productos : " , this.productos)
    })
    console.log("productos : " , this.productos)
  }

  onAddToShoppingCart(product : Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  showProductDetailInfo(id : string){
    this.storeService.getProduct(id)
    .subscribe(data => {
      console.log(data)
      this.toggleProductDetail()
      this.productChoosen = data
    })
  }

}
