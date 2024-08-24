import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RequestService } from '../services/request.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrNotificationService } from '../services/toastr.service';
import { CommonModule } from '@angular/common';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgxMaskDirective, CommonModule, CurrencyMaskModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
  providers: [
    provideNgxMask(),
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class RequestComponent {
  requestForm: FormGroup;



  constructor(private formBuilder: FormBuilder,
    private requestService: RequestService,
    private toastrNotification: ToastrNotificationService) {
    this.requestForm = this.formBuilder.group({
      requesterName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
    });
  }

  sendRequest() {
    try {
      if (this.requestForm.valid) {
        this.requestService.createRequest(this.requestForm.value).subscribe(response => {
          if (response) {
            this.requestForm.reset();
            return this.toastrNotification.showSuccess('Solicitação realizada!', 'Sucesso');
          }
          return this.toastrNotification.showError('Ocorreu um erro inesperado', 'Erro');
        })
      }
    } catch (error) {
      this.toastrNotification.showError('Ocorreu um erro interno: ', 'Erro');
      console.error('Erro: ', error);
    }
  }

  onValueChange(value: any, name: any, values: any) {
    console.log(value, name, values)
  }
}
