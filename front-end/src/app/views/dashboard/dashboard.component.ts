import { Component } from '@angular/core';
import { HEADComponent } from '../head/head.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HEADComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
