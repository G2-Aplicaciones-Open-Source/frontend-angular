import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExperienceDetailService } from '../../services/experience-detail.service';
import { Experience } from '../../model/experience.entity';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrl: './experience-detail.component.css'
})
export class ExperienceDetailComponent implements OnInit {
  experienceName: string = '';
  description: string = '';
  durationText: string = '';
  meetingPoint: string = '';


  constructor( private router: Router, private experienceDetailService: ExperienceDetailService) {}

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.experienceDetailService.getExperienceById(id).subscribe(data => {
      this.experienceName = exp_name;
    });


  }

  goBack(): void {
    this.router.navigate([`/home`]).then()
  }
}
