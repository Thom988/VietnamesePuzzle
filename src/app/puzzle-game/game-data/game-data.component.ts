import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Combination } from '../../core/models/combination.model';
import { CombinationService } from '../../core/services/combination.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-game-data',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './game-data.component.html',
  styleUrl: './game-data.component.scss'
})
export class GameDataComponent {

  executionTime!: number | null;
  combinations$!: Observable<Combination[]> | null;
  combinationsFilter$!: Observable<Combination[]> | null;
  combValue!: string;

  constructor(private combinationService: CombinationService) {}

  ngOnInit() {

  }

  generateCombinations() {
      this.combinationService.generateCombinations().subscribe(
        (time) => {
          this.executionTime = time;
          console.log('Solutions generation successed. Execution time :', time, 'ms');
        },
        (error) => {
          console.error('Solutions generation error :', error);
        }
      );
  }

  deleteCombinations() {
    this.combinationService.deleteCombinations().subscribe(
      () => {
        console.log('Combinations delete successed.');
      },
      (error) => {
        console.error('Combinations delete error :', error);
      }
    );
    this.combinations$ = null;
  }

  getCombinations() {
    this.combinations$ = this.combinationService.getCombinations();
  }

  getCombinationsContaining(combValue: string) {
    this.combinations$ = this.combinationService.getCombinationsContaining(combValue);
  }



}
