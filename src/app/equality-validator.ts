import { AbstractControl } from '@angular/forms';

export class EqualityValidator {
  static addition(target: string, first: string, second: string) {
    return (form: AbstractControl) => {

      const sum = form.value[target];
      const firstNum = form.value[first];
      const secondNum = form.value[second];

      // const { firstNumber, secondNumber, answer } = form.value;

      if (firstNum + secondNum === parseInt(sum)) {
        return null;
      }
      return { addition: true };
    };
  }
}
