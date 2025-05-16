import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/category.entity';
import { Experience } from '../../model/experience.entity';
import { ExperienceService } from '../../services/experience.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number = 1;
  experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService, private router: Router) {}

  ngOnInit(): void {
    this.experienceService.getCategories().subscribe(cats => this.categories = cats);
    this.loadExperiencesByCategory(this.selectedCategoryId);
  }

  onSelectCategory(catId: number): void {
    this.selectedCategoryId = catId;
    this.loadExperiencesByCategory(catId);
  }

  loadExperiencesByCategory(catId: number): void {
    this.experienceService.getExperiencesByCategory(catId).subscribe(data => {
      this.experiences = data.map(exp => ({
        ...exp,
        slug: this.generateSlug(exp.experience_name) // Generar el slug para cada experiencia
      }));
    });
  }

  get selectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    return category ? category.category.toLowerCase() : 'sin categoría';
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, '-') // Reemplazar espacios por guiones
      .replace(/-+/g, '-'); // Eliminar guiones consecutivos
  }

  navigateToDetail(exp: Experience): void {
    const citySlug = this.generateSlug(exp.city_slug || 'ciudad-ejemplo');
    localStorage.setItem('detail', JSON.stringify(exp));
    this.router.navigate([`/${citySlug}/${exp.slug}`]).then();
  }
}

