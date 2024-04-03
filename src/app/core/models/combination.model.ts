// src/app/combination.model.ts

export class Combination {
    id!: number;
    value: string;
    valid!: boolean;
  
    constructor(value: string) {
      this.value = value;
    }
  }