import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Combination } from '../../core/models/combination.model';
import { CombinationService } from '../../core/services/combination.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game-data',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './game-data.component.html',
  styleUrl: './game-data.component.scss'
})
export class GameDataComponent {

  executionTime$!: Observable<number | null>;
  combinations$!: Observable<Combination[]>

  constructor(private combinationService: CombinationService) {}

  ngOnInit() {

  }

  generateCombinations() {
    this.executionTime$ = this.combinationService.generateCombinations();
    //this.combinations$ = this.combinationService.getCombinations();
  }

  deleteCombinations() {
    this.combinationService.deleteCombinations();
  }


}
