import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StarWarsService {
  apiBaseUrl = '/API/v1/star-wars';

  constructor(private http: HttpClient) {
  }

  getPeople(searchStr) {
    return this.http.get<any>(`${this.apiBaseUrl}/?search=${searchStr}`);
  }

}
