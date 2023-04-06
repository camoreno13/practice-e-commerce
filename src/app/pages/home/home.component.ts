import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10
  offset = 0
  products : Product[] = []
  productId : string | null = null

  constructor(private storeService : StoreService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.storeService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit 
    });

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product')
      console.log("product : " , this.productId)
    })
  }

  onLoadMore(){
    this.storeService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit 
    });
  }

}
