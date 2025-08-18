export class TicketTypePrice {
  id: number;
  name: string;
  price: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0.0;
  }
}

export class Availability {
  id: number;
  experiences_id: number;
  start_datetime: string;
  end_datetime: string;
  available_ticket: number;
  capacity: number;
  status: string;
  ticket_types: TicketTypePrice[];

  constructor() {
    this.id = 0;
    this.experiences_id = 0;
    this.start_datetime = '';
    this.end_datetime = '';
    this.available_ticket = 0;
    this.capacity = 0;
    this.status = '';
    this.ticket_types = [];
  }
}
