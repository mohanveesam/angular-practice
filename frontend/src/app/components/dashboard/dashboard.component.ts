import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
