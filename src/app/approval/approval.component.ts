import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { Request } from '../models/request.model';
import { firstValueFrom } from 'rxjs';
import { ToastrNotificationService } from '../services/toastr.service';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent implements OnInit {
  approvalForm: FormGroup;
  requests: Request[] = [];
  selectedRequest: any;
  showInputAction: boolean = false;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private toastrNotification: ToastrNotificationService
  ) {
    this.approvalForm = this.formBuilder.group({
      id: [{ value: 0, disable: true }],
      requesterName: [''],
      description: [''],
      price: [''],
      status: [null, Validators.required],
      observations: [''],
    }, { validator: this.observationsValidator.bind(this) });
  }

  ngOnInit() {
    this.loadRequests();
  }

  async loadRequests() {
    try {
      const data = await firstValueFrom(this.requestService.getRequests());
      this.requests = data.requests.filter((request: Request) => request.status != '0' && request.status != '1');
    } catch (error) {
      console.error('Erro ao carregar solicitações: ', error);
    }
  }

  sendRequest() {
    if (this.approvalForm.valid) {
      this.showInputAction = false;
      this.requestService.approvalRequest(this.approvalForm.value).subscribe(response => {
        if (response) {
          this.approvalForm.reset();
          this.loadRequests();
          this.toastrNotification.showSuccess('Resposta salva', 'Sucesso')
        }
      })
    }
  }

  observationsValidator(control: AbstractControl): { [key: string]: any } | null {
    const status = control.get('status')?.value;
    const observations = control.get('observations');

    if (status == 0 && !observations?.value) {
      return { observationsRequired: true };
    }

    return null;
  }

  fillForm(request: any) {
    this.showInputAction = true;
    this.approvalForm.patchValue({
      id: request.id,
      requesterName: request.requesterName,
      description: request.description,
      price: request.price,
      status: '',
      observations: ''
    });
  }
}
