import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {StarWarsService} from './starwars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  people: any[];
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private swService: StarWarsService) {
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map(event => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.swService.getPeople(q))
    ).subscribe(
      result => {
        this.people = result;
      }
    );
  }
}
