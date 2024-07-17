import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { RequestService } from "../services/request.service";

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

  constructor(private requestService: RequestService, private formBuilder: FormBuilder){
    this.filterForm = formBuilder.group({
      status: [''],
      requestorName: [''],
      itemDescription: ['']
    })
  }

  ngOnInit(){
    this.requestService.getRequests().subscribe(data => {
      this.requests = data;
      this.filteredRequests = data;
    });

    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters();
    })
  }

  applyFilters(){
    const { status, requestorName, itemDescription } = this.filterForm.value;
    this.filteredRequests = this.requests.filter(request => {
      return (!status || request.status === status) &&
             (!requestorName || request.requestorName.toLowerCase().includes(requestorName.toLowerCase())) &&
             (!itemDescription || request.itemDescription.toLowerCase().includes(itemDescription.toLowerCase()));
    })
  }
}
