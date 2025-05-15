import { Routes } from '@angular/router';

import { LayoutComponent } from './core/layout/layout.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import("./core/pages/home/home.component").then(m => m.HomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import("./core/pages/profile-management/profile-management.component").then(m => m.ProfileManagementComponent)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import("./core/pages/cart-management/cart-management.component").then(m => m.CartManagementComponent)
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import("./core/pages/favs-management/favs-management.component").then(m => m.FavsManagementComponent)
      }
    ]
  },
  { path: "**", component: PageNotFoundComponent },
];
