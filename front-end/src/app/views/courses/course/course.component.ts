import { Component, inject } from '@angular/core';
import { Course } from '../../../interfaces/course.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  course: Course | null = null;
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la ruta
    console.log('El id del curso es: ', courseId);
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe((data) => {
        this.course = data;
        console.log('El curso es: ', this.course);
      });
    }
  }
}
