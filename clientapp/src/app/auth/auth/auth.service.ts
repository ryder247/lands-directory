import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  getToken(): string {
    const loginData = this.localStorageService.get('LOGIN_DATA');
    return loginData && loginData ? loginData : '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
