import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combination } from '../models/combination.model';

@Injectable({
  providedIn: 'root'
})
export class CombinationService {

  constructor(private http: HttpClient) { }

  generateCombinations(): Observable<number> {
    return this.http.get<number>("http://localhost:9000/combinations/generate");
  }

  getCombinations(): Observable<Combination[]> {
    return this.http.get<Combination[]>("http://localhost:9000/combinations");
  }

  deleteCombinations(): void {
    this.http.delete("http://localhost:9000/combinations");
  }

  // deleteCombinations(): void {
  //   this.http.delete("http://localhost:9000/combinations")
  //     .subscribe(
  //       () => {
  //         console.log("La suppression s'est bien déroulée !");
  //         // Tu peux ajouter d'autres actions ici si nécessaire
  //       },
  //       (error) => {
  //         console.error("Erreur lors de la suppression :", error);
  //         // Gère l'erreur ici (par exemple, affiche un message d'erreur à l'utilisateur)
  //       }
  //     );

  getCombinationById(combinationId: number): Observable<Combination> {
    return this.http.get<Combination>(`http://localhost:9000/combination/${combinationId}`);
  }

}

