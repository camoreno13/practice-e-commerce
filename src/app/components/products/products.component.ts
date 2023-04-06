import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CreateProductDTO,
  Product,
  UpdateProductDto,
} from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total: number = 0;
  showProductDetail = false;
  productChoosen: Product = {
    id: '',
    images: [],
    price: 0,
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };


  // public productos: Product[] = []; refactoring
  @Input() productos: Product[] = [];
  @Output() loadMore = new EventEmitter();
  // @Input() productId : string | null = null
  @Input() 
  set productId(id : string | null){
    if(id) this.showProductDetailInfo(id)
    this.showProductDetail = true
  }

 
  constructor(private storeService: StoreService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.storeService.getAllProducts().subscribe((data) => {
    //   this.productos = data;
    //   console.log('productos : ', this.productos);
    // });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  showProductDetailInfo(id: string) {
    if(!this.showProductDetail) this.showProductDetail = true
    this.storeService.getProduct(id).subscribe((data) => {
      console.log(data);
      this.toggleProductDetail();
      this.productChoosen = data;
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'new item',
      price: 988,
      images: [''],
      description: 'new item',
      categoryId: 2,
    };

    this.storeService.createProduct(product).subscribe((data) => {
      console.log('created ', data);
      this.productos.unshift(data);
    });
  }

  updateProduct() {
    const update: UpdateProductDto = {
      title: 'nuevo item',
    };

    this.storeService
      .update(this.productChoosen.id, update)
      .subscribe((data) => {
        const productIndex = this.productos.findIndex((product) => { return product.id === this.productChoosen.id});
        this.productos[productIndex] = data;
      });
  }

  onLoadMore(){
    this.loadMore.emit()
  }

}
