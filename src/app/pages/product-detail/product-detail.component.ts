import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { Location} from '@angular/common'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private router: ActivatedRoute,
    private storeProduct: StoreService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.storeProduct.getProduct(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.product = data;
      });
  }

  goToBack() {
    this.location.back()
  }
}
