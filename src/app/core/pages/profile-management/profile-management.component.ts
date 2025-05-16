import {Component, OnInit} from '@angular/core';
import {Tourist} from '../../model/tourist.entity';
import {TouristService} from '../../services/tourist.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile-management',
  imports: [
    NgForOf
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent implements OnInit {
  tourists: Tourist[] = [];
  constructor(private touristService: TouristService) {

  }
  ngOnInit() {
    this.touristService.getTourists().subscribe(tourists => this.tourists = tourists);
  }
}
