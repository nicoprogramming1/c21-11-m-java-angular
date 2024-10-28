import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HEADComponent } from '../head/head.component';
import { MainComponent } from './main/main.component';


@Component({
  selector: 'app-dashboard-teacher',
  standalone: true,
  imports: [HEADComponent, RouterOutlet, MainComponent],
  templateUrl: './dashboard-teacher.component.html',
  styleUrl: './dashboard-teacher.component.css'
})
export class DashboardTeacherComponent {

}
