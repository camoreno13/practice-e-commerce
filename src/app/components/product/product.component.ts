import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {
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

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetail() {
    this.showProduct.emit(this.product.id);
  }
}
