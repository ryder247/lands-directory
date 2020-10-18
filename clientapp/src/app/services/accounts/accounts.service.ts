import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {}

  signin(model): any {
    return this.http.post(environment.baseUrl + '/auth/login', model).pipe(
      tap((res: any) => {
        this.localStorage.save('LOGIN_DATA', JSON.stringify(res));
      }),
    );
  }

  signup(model): any {
    return this.http.post(environment.baseUrl + '/auth/register', model);
  }
}
