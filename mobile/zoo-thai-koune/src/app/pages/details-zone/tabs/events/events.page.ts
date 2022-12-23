import { DetailsZonePage } from './../../details-zone.page';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events$: Observable<Event[] | null> | undefined;
  zoneId: string | null = this.detailsZonePage.getId();

  constructor(
    private eventService: EventService,
    private detailsZonePage: DetailsZonePage
  ) {}

  ngOnInit() {
    if (this.zoneId) {
      this.getEventsByZone(+this.zoneId, 'events/zones');
    }
  }

  ionViewWillEnter() {
    if (this.zoneId) {
      this.getEventsByZone(+this.zoneId, 'events/zones');
    }
  }

  getEventsByZone(id: number, endpoint: string) {
    this.events$ = this.eventService.getEvents(id, endpoint);
  }
}
