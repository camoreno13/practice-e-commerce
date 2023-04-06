import { NgModule } from '@angular/core';
import { RouterModule, Routes , PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/website/website.module').then((m) => m.WebsiteModule),
    data : {
      preload : true
    }
  },
  {
    path: 'cms',
    loadChildren: () =>
      import('../app/cms/cms.module').then((m) => m.CmsModule),
  },

  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
