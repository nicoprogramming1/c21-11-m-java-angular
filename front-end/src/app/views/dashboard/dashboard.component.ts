import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from '../aside/aside.component';
import { HEADComponent } from '../head/head.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,AsideComponent, HEADComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
