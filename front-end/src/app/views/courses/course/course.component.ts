import { Component, inject } from '@angular/core';
import { Course } from '../../../interfaces/course.interface';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course!: Course
  private route = inject(ActivatedRoute)
  private courseService = inject(CourseService)

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la ruta
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe((data) => {
        this.course = data;
      });
    }
  }
}
