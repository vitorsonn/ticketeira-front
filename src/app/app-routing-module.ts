import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth-component/auth-component';
import { AdminEventsList } from './features/admin/events/admin-events-list/admin-events-list';
import { AdminEventsForm } from './features/admin/events/admin-events-form/admin-events-form';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { EventList } from './features/events/event-list/event-list';
import { EventDetails } from './features/events/event-details/event-details';
import { PaymentSuccess } from './features/payments/payment-success/payment-success';
import { MyTicketsComponent } from './features/tickets/my-tickets/my-tickets';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },

  {
    path: 'events',
    component: EventList,
    canActivate: [authGuard],
  },
  {
    path: 'events/:id',
    component: EventDetails,
    canActivate: [authGuard]
  },

  {
    path: 'my-tickets',
    component: MyTicketsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'payment-success',
    component: PaymentSuccess,
    canActivate: [authGuard],
  },

  {
    path: 'admin/events',
    component: AdminEventsList,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/events/:id/edit',
    component: AdminEventsForm,
    canActivate: [authGuard, adminGuard]
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
