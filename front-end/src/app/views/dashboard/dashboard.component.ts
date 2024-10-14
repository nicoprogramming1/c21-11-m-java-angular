import { Component } from '@angular/core';
import { HEADComponent } from '../head/head.component';
import {AsideComponent} from '../aside/aside.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HEADComponent,AsideComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
