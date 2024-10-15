import { Component } from '@angular/core';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [DeleteComponent],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

}
