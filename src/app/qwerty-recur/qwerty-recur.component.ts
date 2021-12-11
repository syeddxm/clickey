import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-qwerty-recur',
  templateUrl: './qwerty-recur.component.html',
  styleUrls: ['./qwerty-recur.component.scss']
})
export class QwertyRecurComponent implements OnInit {

  testActive = false;

  input = "";
  inputMode = false;
  bottomStage = false;

  r1 = {    
    k:  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    s: 0,
    e: 10,
    l: 10
  }
  r2 = {
    k: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    s: 0,
    e: 9,
    l: 9
  }
  r3 = {
    k: ["Z", "X", "C","_", "V", "B", "N", "M"],
    s: 0,
    e: 8,
    l: 8
  }

  currentVisible = -1;
  timeouts: any[] = [];
  delay = 1000;

  keyStrokes = 0;

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: any) {
    if(this.testActive){
      if ("Shift" === event.key) {
        this.keyStrokes++;
        if (1 == event.location){
          this.leftKeyPress();
        } else if (2 == event.location) {
          this.rightKeyPress();
        }
      }
    }
  }

  constructor(private test:  TestService) { 
    this.test.testActive.subscribe((val) => {
      this.testActive = val;
    });
  }
  ngOnInit(): void {
  }


  leftKeyPress() {
    // this.startTimer2();
    if (this.inputMode == false){
      this.inputMode = true;
    } else if (this.r1.s == 1 && this.r1.e == 2){
      this.selectLetter2(this.r1.k[this.r1.s]);
    } else if (this.r1.s == 5 && this.r1.e == 7) {
      this.selectLetter2(this.r1.k[this.r1.s]);
    } else if (this.r1.s == 9 && this.r1.e == 10) {
      this.selectLetter2(this.r1.k[this.r1.s]);
    } else if (this.r1.l > 0 && this.r2.l == 1 && this.r3.l == 1){
      this.selectLetter2(this.r1.k[this.r1.s]);
    } else if (this.r1.l + this.r2.l + this.r3.l > 3) {
      this.goLeft();
      this.calcLengths();
    } else {
      this.selectLetter2(this.r2.k[this.r2.s]);
    }
  }

  rightKeyPress() {
    // this.startTimer2();
    if (this.inputMode == false){
      this.inputMode = true;
    } else if (this.r1.s == 5 && this.r1.e == 7) {
      this.r1.s++;
      this.calcLengths();
    } else if (this.r1.l +  this.r2.l + this.r3.l > 3){
      this.goRight();
      this.calcLengths();        
    } else if (this.r1.l > 1 && this.r2.l > 1 && this.r3.l == 1) {
      this.goRight();
      this.calcLengths();
    } else if (this.r1.s == 1 && this.r1.e == 2) {
      this.selectLetter2(this.r2.k[this.r2.s]);
    } else if (!this.bottomStage) {
      this.r1.s++;
      this.calcLengths();
      this.bottomStage = true;
    } else {
      let letter = this.r3.k[this.r3.s];
      this.selectLetter2(letter);
    }
  }

  goLeft(){
    this.r1.e = Math.ceil((this.r1.s + this.r1.e) / 2);
    this.r2.e = Math.ceil((this.r2.s + this.r2.e) / 2);
    this.r3.e = Math.ceil((this.r3.s + this.r3.e) / 2);
  }

  goRight(){
    this.r1.s = Math.ceil((this.r1.s + this.r1.e) / 2);
    this.r2.s = Math.ceil((this.r2.s + this.r2.e) / 2);
    this.r3.s = Math.ceil((this.r3.s + this.r3.e) / 2);
    
  }

  calcLengths(){
    this.r1.l = this.r1.e - this.r1.s;
    this.r2.l = this.r2.e - this.r2.s;
    this.r3.l = this.r3.e - this.r3.s;
  }

  selectLetter2(letter: string) {
    this.input += letter;
    this.test.addLetter(letter, this.keyStrokes);
    this.keyStrokes = 0;
    this.reset2();
  }

  reset2(){
    this.r1.s = 0;
    this.r2.s = 0;
    this.r3.s = 0;
    this.r1.e = 10;
    this.r2.e = 9;
    this.r3.e = 8;
    this.bottomStage = false;
    this.inputMode = false;
    this.calcLengths();
    this.clearAllTimeouts();
  }

  startTimer2() {
    this.clearAllTimeouts();
    this.timeouts.push(setTimeout( () => {
      if(this.inputMode) {
        this.reset2();
      }
    }
    , this.delay * 2));
  }

  clearAllTimeouts() {
    while(this.timeouts.length)  {
      clearTimeout(this.timeouts.pop()!);
    }    
  }

  resetInput() {
    this.reset2(),
    this.input = ""
  }

}
