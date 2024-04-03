import { Component } from '@angular/core';
import { GameBoardComponent } from '../../puzzle-game/game-board/game-board.component';
import { GameDataComponent } from '../../puzzle-game/game-data/game-data.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [GameBoardComponent, GameDataComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
