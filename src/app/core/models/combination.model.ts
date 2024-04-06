// src/app/combination.model.ts

export class Combination {
    id!: number | null;
    value: string;
    valid!: boolean;
  
    constructor(value: string) {
      this.value = value;
    }
  }