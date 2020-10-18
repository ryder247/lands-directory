import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountsService } from '../../services/accounts/accounts.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  model = {} as any;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private accountsService: AccountsService,
  ) {}

  ngOnInit(): void {}

  signin(): void {
    this.isLoading.next(true);
    this.accountsService.signin(this.model).subscribe(
      (res: any) => {
        this.router.navigate(['/']);
        this.isLoading.next(false);
      },
      () => {
        this.isLoading.next(false);
        alert('Login failed');
      },
    );
  }
}
