import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/category.entity';
import { Experience } from '../../model/experience.entity';
import { ExperienceService } from '../../services/experience.service';
import { Favorite } from '../../model/favorite.entity';
import { FavoritesService } from '../../services/favorites.service';

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
  experiences: (Experience & { isFavorite?: boolean; favoriteId?: number })[] = [];

  touristId: number = 1; // ID simulado, puedes obtenerlo del auth si lo manejas

  constructor(
    private experienceService: ExperienceService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

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
        slug: this.generateSlug(exp.experience_name),
        isFavorite: false,
        favoriteId: undefined
      }));

      // Verificar cuáles ya están en favoritos
      this.favoritesService.getFavoritesByTourist(this.touristId).subscribe(favs => {
        this.experiences.forEach(exp => {
          const fav = favs.find(f => f.experience_id === exp.id);
          if (fav) {
            exp.isFavorite = true;
            exp.favoriteId = fav.id;
          }
        });
      });
    });
  }

  toggleFavorite(exp: Experience & { isFavorite?: boolean; favoriteId?: number }): void {
    if (exp.isFavorite && exp.favoriteId) {
      // Ya es favorito, entonces lo quitamos
      this.favoritesService.removeFavorite(exp.favoriteId).subscribe(() => {
        exp.isFavorite = false;
        exp.favoriteId = undefined;
      });
    } else {
      // Solo lo agregamos si NO está ya en favoritos (extra doble chequeo por si acaso)
      this.favoritesService.getFavoritesByTourist(this.touristId).subscribe(favs => {
        const alreadyFav = favs.find(f => f.experience_id === exp.id);
        if (!alreadyFav) {
          const newFavorite: Favorite = {
            experience_id: exp.id,
            tourist_id: this.touristId
          };
          this.favoritesService.addFavorite(newFavorite).subscribe(fav => {
            exp.isFavorite = true;
            exp.favoriteId = fav.id!;
          });
        }
      });
    }
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
    this.router.navigate([`/${citySlug}/${exp.slug}`]).then();
  }
}

