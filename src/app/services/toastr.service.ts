import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = 'Sucesso') {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = 'Erro') {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string = 'Aviso') {
    this.toastr.warning(message, title);
  }
}
