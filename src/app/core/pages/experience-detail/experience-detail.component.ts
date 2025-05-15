import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf si es standalone
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';

// Define una interfaz para tus datos de experiencia
interface Experience {
  id: number;
  category_id: number;
  destination_id: number;
  city_slug: string;
  experience_name: string;
  description: string;
  duration_text: string;
  meeting_point: string;
}

@Component({
  selector: 'app-experience-detail',
  // Si es standalone, agrega estas propiedades:
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí si es standalone
  // Fin standalone
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {
  experience: Experience | undefined;
  isLoading = true;
  error = false;

  // Inyecta ActivatedRoute y HttpClient
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient // O un servicio que maneje la carga de datos
  ) { }

  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.paramMap.pipe(
      tap(() => { // Opcional: resetear estado de carga/error antes de cada búsqueda
        this.isLoading = true;
        this.error = false;
        this.experience = undefined;
      }),
      switchMap(params => {
        const citySlug = params.get('city_slug');
        const experienceNameSlug = params.get('experience_name_slug');

        if (!citySlug || !experienceNameSlug) {
          // Manejar caso de parámetros faltantes si es necesario
          this.error = true;
          this.isLoading = false;
          return []; // Retorna un observable vacío
        }

        // Carga los datos de las experiencias (asegúrate de que la ruta sea correcta)
        // NOTA: En una app real, esto lo harías en un servicio y lo cacharías.
        // Aquí lo hacemos simple para el ejemplo.
        return this.http.get<Experience[]>('/experiences').pipe(
          map(experiences => {
            // Busca la experiencia que coincida con city_slug y experience_name_slug
            // Necesitas una función para "slugificar" el experience_name para comparar
            const foundExperience = experiences.find(exp =>
              exp.city_slug === citySlug &&
              this.slugify(exp.experience_name) === experienceNameSlug
            );
            return foundExperience;
          })
        );
      })
    ).subscribe({
      next: (foundExperience) => {
        this.experience = foundExperience;
        this.isLoading = false;
        if (!foundExperience) {
          this.error = true; // Indica que no se encontró la experiencia
        }
      },
      error: (err) => {
        console.error('Error loading experience:', err);
        this.error = true;
        this.isLoading = false;
      }
    });
  }

  // Función simple para crear un slug a partir de una cadena
  // Deberías hacer esto más robusto para manejar caracteres especiales, etc.
  slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')         // Reemplaza espacios por guiones
      .replace(/[^\w-]+/g, '')     // Elimina todos los caracteres no alfanuméricos excepto guiones
      .replace(/-+/g, '-')         // Reemplaza múltiples guiones por uno solo
      .replace(/^-+/, '')           // Elimina guiones al principio
      .replace(/-+$/, '');          // Elimina guiones al final
  }
}
