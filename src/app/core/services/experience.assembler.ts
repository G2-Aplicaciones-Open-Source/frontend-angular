import { ExperienceResponse } from './experience.response';
import { Experience} from '../model/experience.entity';


export class ExperienceAssembler {
  static toEntityFromResponseArray(responseArray: ExperienceResponse[]): Experience[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: ExperienceResponse): Experience {
    return {
      id: response.id,
      category_id: response.category_id,
      destination_id: response.destination_id,
      city_slug: response.city_slug,
      experience_name: response.experience_name,
      description: response.description,
      duration_text: response.duration_text,
      meeting_point: response.meeting_point,
      slug: response.slug
    };
  }
}
