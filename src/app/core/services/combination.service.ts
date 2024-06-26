import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Combination } from "../models/combination.model";

@Injectable({
  providedIn: "root",
})
export class CombinationService {
  private selectedCombination = new BehaviorSubject<any>(null);
  private combinationsUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  notifyCombinationUpdated() {
    this.combinationsUpdated.next();
  }

  getCombinationsUpdated(): Observable<void> {
    return this.combinationsUpdated.asObservable();
  }

  setSharedCombination(combination: Combination) {
    this.selectedCombination.next(combination);
  }

  getSharedCombination(): Observable<Combination> {
    return this.selectedCombination.asObservable();
  }

  generateCombinations(): Observable<number> {
    return this.http.get<number>("http://localhost:9000/combinations/generate");
  }

  getCombinations(): Observable<Combination[]> {
    return this.http.get<Combination[]>("http://localhost:9000/combinations");
  }

  deleteCombinations(): Observable<void> {
    return this.http.delete<void>("http://localhost:9000/combinations");
  }

  getCombinationById(combinationId: number): Observable<Combination> {
    return this.http.get<Combination>(
      `http://localhost:9000/combination/${combinationId}`
    );
  }

  getCombinationsContaining(combValue: string): Observable<Combination[]> {
    return this.http.get<Combination[]>(
      `http://localhost:9000/combinations/contain/${combValue}`
    );
  }

  getCombinationTest(combValue: string): Observable<boolean> {
    return this.http.get<boolean>(
      `http://localhost:9000/combination/test/${combValue}`
    );
  }

  saveCombination(combination: Combination): Observable<Combination> {
    return this.http.post<Combination>(
      "http://localhost:9000/combination",
      combination
    );
  }

  updateCombination(combination: Combination): Observable<Combination> {
    return this.http.put<Combination>(
      "http://localhost:9000/combination",
      combination
    );
  }
}
