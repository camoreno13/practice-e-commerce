import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId : string | null = null
  limit = 10
  offset = 0
  products : Product[] = []

  constructor(private route : ActivatedRoute, private storeService : StoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.categoryId = params.get('id')
        if(this.categoryId){
          this.storeService.getByCategory(this.categoryId , this.limit , this.offset)
          .subscribe(data => {
            this.products = data
          })
        }
      }
    )
  }

}
