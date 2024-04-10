import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  combination!: Combination | null;
  combinationPattern: string = "^(?=.*1)(?=.*2)(?=.*3)(?=.*4)(?=.*5)(?=.*6)(?=.*7)(?=.*8)(?=.*9)[1-9]{9}$";
  userInfo!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private combinationService: CombinationService,
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

      this.combinationService.getSharedCombination().subscribe((combination) => {
        if (combination != null) {
          this.combination = combination;
          let i: number = 0;
          for (i=1; i<10; i++) {
            this.combinationForm.get(`input${i}`)?.setValue(combination.value[i-1]);
          }
        }
      })
    }

    testCombination(): void {
      this.saveForm();
      if(this.isCombRespectsUniqueness()) {
        if(this.combination != null) {
          this.combinationService.getCombinationTest(this.combination.value).subscribe((test) => {
            if (test) {
              this.userInfo = "This combination is correct";
            } else {
              this.userInfo = "This combination is not correct";
            }
          },
          (error) => {
            this.userInfo = "Combination test error";
            console.error("Combination test error",error);
          })
        }
      } else {
        this.userInfo = "Impossible to test this combination, it doesn't respect the uniqueness principle !";
      }
    }

    saveCombination(): void {
      this.saveForm();
      if (this.isCombRespectsUniqueness()) {
        if (this.combination != null) {
          this.combination.id = null;
          this.combinationService.saveCombination(this.combination).subscribe((newCombination) => {
            this.userInfo = "A new combination has been saved :" + " " + newCombination.value;
            this.combination = null;
            this.combinationForm.reset();
            this.combinationService.notifyCombinationUpdated();
          }, (error) => {
            console.error("Impossible to save this combination : ", error);
            this.userInfo = "Impossible to save this combination";
          });
        }
      } else {
        this.userInfo = "Impossible to save this combination, it doesn't respect the uniqueness principle !";
      }
    }

    updateCombination():void {
      this.saveForm();
      if(this.isCombRespectsUniqueness()) {
        if (this.combination != null ) {
          this.combinationService.updateCombination(this.combination).subscribe((updatedCombination) => {
            this.userInfo = "Combination " + updatedCombination.id + " has been updated : " + updatedCombination.value;
            this.combination = null;
            this.combinationForm.reset();
            this.combinationService.notifyCombinationUpdated();
            },
            (error) => {
              this.userInfo = "Impossible to update this combination";
              console.error("Impossible to update this combination :" + error);
          })
        }
        
      }
    }

    isCombRespectsUniqueness(): boolean {
      let bool: boolean = false;
      if(this.combination != null ) {
        bool = new RegExp(this.combinationPattern).test(this.combination.value);
      }
      return bool;
    }

    saveForm(): void {
      let i = 1;
      if(this.combination == undefined) {
        this.combination = new Combination("");
      } else {
        this.combination.value = "";
      }
      for (i=1; i<10; i++) {
        this.combination.value += this.combinationForm.get(`input${i}`)?.value;
      }
    }
}

