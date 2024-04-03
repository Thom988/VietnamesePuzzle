import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Combination } from '../../core/models/combination.model';
import { CombinationService } from '../../core/services/combination.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

  combinationForm!: FormGroup;
  combination!: Combination;
  combinationPattern: string = "^(?=.*1)(?=.*2)(?=.*3)(?=.*4)(?=.*5)(?=.*6)(?=.*7)(?=.*8)(?=.*9)[1-9]{9}$";
  errorMessage!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private combinationService: CombinationService
    ) {}

    ngOnInit() {

      this.combinationForm = this.formBuilder.group({
        input1: [null, Validators.required],
        input2: [null, Validators.required],
        input3: [null, Validators.required],
        input4: [null, Validators.required],
        input5: [null, Validators.required],
        input6: [null, Validators.required],
        input7: [null, Validators.required],
        input8: [null, Validators.required],
        input9: [null, Validators.required]
      })
    }

    testCombination(): void {
      this.saveForm();
      if(this.isCombRespectUniqueness()) {
        // A FAIRE : Tester la combinaison en  l'envoyant à l'API grâce au service
        this.errorMessage = null;
        console.log(this.combination);
      } else {
        // A FAIRE : Message de test impossible en raison du non respect de l'unicité
        this.errorMessage = "Impossible to test this combination, it doesn't respect the uniqueness principle !";
      }
    }

    saveCombination(): void {
      this.saveForm();
      if (this.isCombRespectUniqueness()) {
        // A FAIRE : sauvegarder la combinaison grâce au service vers l'API 
        console.log(this.combination);
        this.errorMessage = null;
      } else {
        // A FAIRE : Message de sauvegarde impossible en raison du non respect de l'unicité
        this.errorMessage = "Impossible to save this combination, it doesn't respect the uniqueness principle !";
      }
    }

    isCombRespectUniqueness(): boolean {
      let bool: boolean = false;
      bool = new RegExp(this.combinationPattern).test(this.combination.value);
      return bool;
    }

    saveForm(): void {
      let i = 1;
      this.combination = new Combination("");
      for (i=1; i<10; i++) {
        this.combination.value += this.combinationForm.get(`input${i}`)?.value;
      }
    }
}

