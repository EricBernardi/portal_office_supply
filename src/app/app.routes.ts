import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ApprovalComponent } from './approval/approval.component';
import { QueryComponent } from './query/query.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'request', component: RequestComponent },
  { path: 'query', component: QueryComponent },
  { path: 'approval', component: ApprovalComponent },
  { path: '', redirectTo: '/query', pathMatch: 'full' }
];
