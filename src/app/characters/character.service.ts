import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharacter } from '../models/character.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IResult } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public defaultCharacters: ICharacter[] = [
    {
    name: "Iron man"
    },
    {
      name: "Thor"
    }
];

public characters$: Observable<ICharacter[]> = this.httpClient.get<IResult>(`${environment.apiUrl}characters`).pipe(
  map(result => {
    return result.data.results;
  }),
  catchError(() => { // Catch and REPLACE
     return of(this.defaultCharacters);
  }),
  // catchError(error => { // Catch and RETHROW 
  //   return throwError(error);
  // }),
);

  constructor(private readonly httpClient: HttpClient) { }
}
