import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../model/experience.entity';
import { Availability } from '../../model/availability.entity';
import { ExperienceService } from '../../services/experience.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.css']
})
export class CartManagementComponent implements OnInit {
  cartItems: Experience[] = [];
  availabilities: Availability[] = [];
  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiencesByCategory(1).subscribe(experiences => {
      if (experiences.length > 0) {
        this.cartItems = [experiences[0]];
        const expId = experiences[0].id;

        this.experienceService.getAvailabilities().subscribe(availabilities => {
          // Filtramos solo las disponibilidades que coincidan con la experiencia
          this.availabilities = availabilities.filter(a => a.experiences_id === expId);
        });
      }
    });
  }
  confirmPurchase(): void {
    alert('Compra confirmada. ¡Gracias por tu compra!');
    // Aquí podrías agregar lógica real para procesar la compra
  }

  navigateToDetail(exp: Experience): void {
    console.log(`Ir a los detalles de: ${exp.experience_name}`);
    // Aquí puedes agregar la lógica para navegar a los detalles
  }
  getAvailabilityByExperienceId(expId: number | undefined) {
    if (expId == null) return null;
    return this.availabilities.find(a => a.experiences_id === expId) || null;
  }
}

