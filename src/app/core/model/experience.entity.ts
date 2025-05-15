
export class Experience {
  id: number;
  category_id: number;
  destination_id: number;
  city_slug: string;
  experience_name: string;
  description: string;
  duration_text: string;
  meeting_point: string;
  slug: string;
  constructor() {
    this.id = 0;
    this.category_id = 0;
    this.destination_id = 0;
    this.city_slug = '';
    this.experience_name = '';
    this.description = '';
    this.duration_text = '';
    this.meeting_point = '';
    this.slug = '';
  }
}
