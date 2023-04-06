import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeMenu = false 
  counter = 0
  categories : Category[] = []

  constructor(private storeService : StoreService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    });
    this.getAllCategories();
  }

  toggleMenu(){
    console.log("entro")
    this.activeMenu = !this.activeMenu
  }

  getAllCategories(){
    this.storeService.getAllCategories().subscribe( data => {
      console.log("categoria " , data)
      this.categories = data
    })
  }


}
