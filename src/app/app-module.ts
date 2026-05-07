import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { MyTicketsComponent } from './features/tickets/my-tickets/my-tickets';
import { AuthComponent } from './features/auth/auth-component/auth-component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importe o HTTP_INTERCEPTORS
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importe seu interceptor

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthComponent,
    Layout,
    Home,
    MyTicketsComponent,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
