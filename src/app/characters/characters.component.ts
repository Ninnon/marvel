import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { ICharacter } from '../models/character.model';
import { CharacterService } from './character.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

interface ICharactersVm {
  characters: ICharacter[];
  errorMessage: string;
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  public characters$: Observable<ICharacter[]>;
  private error$$: BehaviorSubject<string> = new BehaviorSubject(null);
  public errorMessage$ = this.error$$.asObservable();

  public vm$: Observable<ICharactersVm>;

  constructor(private readonly characterService: CharacterService) { }

  public ngOnInit(): void {
    this.characters$ = this.characterService.characters$.pipe(
      catchError(error => {
        console.log("We hit this catchError in the component", error);
        this.error$$.next(error.message);
        return of(null);
      })
    )

    this.vm$ = combineLatest([this.characters$, this.errorMessage$]).pipe(
      map(([characters, errorMessage]) => ({
        characters,
        errorMessage
      }))
    )};
}
