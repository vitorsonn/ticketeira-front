import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthResponse } from '../models/auth.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)
  private readonly API_URL = `${environment.apiUrl}/users`
  private router = inject(Router)

  login(credentials: any){
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('role', res.role)
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')

    this.router.navigate(['login'])
    window.location.reload()
    
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/register`, userData);
  }


  
  
  
}
