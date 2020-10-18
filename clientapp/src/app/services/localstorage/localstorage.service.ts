import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: string) {
    const encodedString = window.localStorage.getItem(key);
    const decodedString = encodedString && window.atob(encodedString);
    const parsedString = JSON.parse(decodedString);
    return parsedString;
  }

  save(key: string, value: string) {
    const encodedString = window.btoa(value);
    window.localStorage.setItem(key, encodedString);
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.removeItem('LOGIN_DATA');
    window.localStorage.removeItem('ACCOUNT_DATA');
  }
}
