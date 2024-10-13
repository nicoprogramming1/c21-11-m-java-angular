import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  
  public product = this.stateService.product
  public loading = this.stateService.loading
  public error = this.stateService.error
  
  ngOnInit() {
    setTimeout(() => {
      this.route.params.pipe(
        switchMap(({ id }) => this.userService.getUserById(id))
      ).subscribe();
    }, 2000)
  }


}
