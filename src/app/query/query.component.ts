import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { RequestService } from "../services/request.service";
import { firstValueFrom } from 'rxjs';
import { ToastrNotificationService } from "../services/toastr.service";

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})

export class QueryComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterForm: FormGroup;

  constructor(private requestService: RequestService,
    private formBuilder: FormBuilder,
    private toastrNotification: ToastrNotificationService) {
    this.filterForm = formBuilder.group({
      status: [''],
      requesterName: [''],
      description: ['']
    })
  }

  ngOnInit() {
    this.loadRequests();
  }

  async loadRequests() {
    try {
      const data = await firstValueFrom(this.requestService.getRequests());
      this.requests = data.requests;
      this.filteredRequests = data.requests;
      this.filterForm.valueChanges.subscribe(filters => {
        this.applyFilters();
      })
    } catch (error) {
      this.toastrNotification.showSuccess('Ocorreu um erro interno', 'Erro')
    }
  }

  applyFilters() {
    const { status, requesterName, description } = this.filterForm.value;
    this.filteredRequests = this.requests.filter(request => {
      return (!status || request.status === status) &&
        (!requesterName || request.requesterName.toLowerCase().includes(requesterName.toLowerCase())) &&
        (!description || request.description.toLowerCase().includes(description.toLowerCase()));
    })
  }

  setStatusRequest(status: number): string {
    if (!status) return '';
    return status == 0 ? 'Reprovado' : 'Aprovado';
  }

  parseToReal(value: number): string {
    const valueFormat = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value);
    return valueFormat; 
  }
}
