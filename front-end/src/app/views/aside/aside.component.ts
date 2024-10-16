import { Component } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [ListUserComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

}
