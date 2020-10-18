import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountsService } from '../../services/accounts/accounts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  model = {} as any;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private accountsService: AccountsService,
  ) {}

  ngOnInit(): void {}

  signup(): void {
    this.isLoading.next(true);
    this.accountsService.signup(this.model).subscribe(
      () => {
        alert('Registration successful');
        this.router.navigate(['/auth/signin']);
        this.isLoading.next(false);
      },
      () => {
        alert('Registration failed');
        this.isLoading.next(false);
      },
    );
  }
}
