import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favorite } from '../../model/favorite.entity';
import { FavoritesService } from '../../services/favorites.service';
import { Experience } from '../../model/experience.entity';
import { Router } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-favs-management',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './favs-management.component.html',
  styleUrls: ['./favs-management.component.css']
})
export class FavsManagementComponent implements OnInit {
  favorites: Favorite[] = [];
  touristId: number = 1;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.favoritesService
      .getFavoritesByTourist(this.touristId)
      .subscribe(favs => this.favorites = favs);
  }


  navigateToExperience(fav: Favorite): void {

    this.router.navigate([`/experiences/${fav.experience_id}`]);
  }

  removeFavorite(fav: Favorite): void {
    if (!fav.id) { return; }
    this.favoritesService
      .removeFavorite(fav.id)
      .subscribe(() => {
        this.favorites = this.favorites.filter(f => f.id !== fav.id);
      });
  }
}

