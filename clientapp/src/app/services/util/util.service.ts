import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private toastrService: ToastrService) {}

  showSuccessToast(msg: string, title?: string): void {
    this.toastrService.success(msg, title);
  }

  showFailToast(msg: string, title?: string): void {
    this.toastrService.error(msg, title);
  }

  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
