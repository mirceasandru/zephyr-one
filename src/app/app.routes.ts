import { Routes } from "@angular/router";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.AuthRoutes),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes),
  //   canActivate: [authGuard],
  // },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];