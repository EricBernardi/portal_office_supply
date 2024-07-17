import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { Request } from '../models/request.model';

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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private requestService: RequestService){
    this.approvalForm = this.formBuilder.group({
      requestorName: [{value: '', disable: true}],
      itemDescription: [{value: '', disable: true}],
      priceProduct: [{value: '', disable: true}],
      status: [null, Validators.required],
      observations: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.loadRequests();
  }

  loadRequests(){
    this.requestService.getRequests().subscribe(
      (data: Request[]) => {
        this.requests = data;
      },
      (error) => {
        console.error('Erro ao carregar solicitações:', error);
      }
    );
  }

  sendRequest(id: number) {
    if (this.approvalForm.valid) {
      this.requestService.getRequests().subscribe(response => {
        console.log('Para aprovar: ', response);
      })
    }
  }
}
