import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../pages/category/category.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';
import { RegisterComponent } from '../pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'category',
        loadChildren : () => import ('../pages/category/category.module').then( m => m.CategoryModule),
        data : {
          preload : true
        }
      },
      { path: 'product/:id', component: ProductDetailComponent },
      { 
        path : 'profile',
        component : ProfileComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'registry',
        canDeactivate : [ExitGuard],
        component : RegisterComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
