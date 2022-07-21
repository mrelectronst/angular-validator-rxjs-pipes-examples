import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';
import { EqualityValidator } from '../equality-validator';

@Component({
  selector: 'app-equality',
  templateUrl: './equality.component.html',
  styleUrls: ['./equality.component.css'],
})
export class EqualityComponent implements OnInit {
  seconds: number = 0;

  mathForm = new FormGroup(
    {
      firstNumber: new FormControl(this.getRandomNumber()),
      secondNumber: new FormControl(this.getRandomNumber()),
      answer: new FormControl(''),
    },
    [EqualityValidator.addition('answer', 'firstNumber', 'secondNumber')]
  );

  get firstNumber() {
    return this.mathForm.value.firstNumber;
  }

  get secondNumber() {
    return this.mathForm.value.secondNumber;
  }

  constructor() {}

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(750),

        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.seconds =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        this.mathForm.setValue({
          firstNumber: this.getRandomNumber(),
          secondNumber: this.getRandomNumber(),
          answer: '',
        });
      });
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
