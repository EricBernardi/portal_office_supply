import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RequestService } from '../services/request.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
  providers: [
    provideNgxMask(),
],
})
export class RequestComponent {
  requestForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private requestService: RequestService){
    this.requestForm = this.formBuilder.group({
      requestorName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      priceProduct: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  sendRequest() {
    if (this.requestForm.valid) {
      this.requestService.createRequest(this.requestForm.value).subscribe(response => {
        console.log('Resposta: ', response);
      })
    }
  }
}
