import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ApprovalComponent } from './approval/approval.component';
import { QueryComponent } from './query/query.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RequestComponent, ApprovalComponent, QueryComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy_material';
}
