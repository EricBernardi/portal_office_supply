import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Request } from "../models/request.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  createRequest(request: Request): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/requester`, request);
  }

  getRequests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin`);
  }

  approvalRequest(request: Request): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/approver`, request)
  }
}
