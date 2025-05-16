import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Experience } from '../../model/experience.entity';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {
  experience!: Experience;

  ngOnInit(): void {
    const stored = localStorage.getItem('detail');
    if (stored) {
      this.experience = JSON.parse(stored);
    }
  }
}
