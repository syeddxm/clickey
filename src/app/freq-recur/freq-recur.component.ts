import { Component, HostListener, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-freq-recur',
  templateUrl: './freq-recur.component.html',
  styleUrls: ['./freq-recur.component.scss']
})
export class FreqRecurComponent implements OnInit {

  testActive = false;

  input = "";
  inputMode = false;

  keys = [
    ["_", "E", "A", "R", "D", "U"], 
    ["T", "O", "I", "L", "G", "V"], 
    ["N", "S", "F","Y", "X"],
    ["H", "C", "P","K", "J"],
    ["M", "B", "W", "Q", "Z"],
  ]

  upDown = false;
  lastCol = false;
  lastRow = false;
  lastThree = false;


  rowPos = {
    s: 0,
    e: 5,
    m: 3
  }

  data: any[] = [];

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
    this.reset();
  }


  leftKeyPress() {
    // this.startTimer2();
    if (this.inputMode == false){
      this.inputMode = true;
    } else if (this.upDown && !this.lastCol && !this.lastRow) {
      this.goUp();
      this.upDown = false;
    } else if (!this.upDown && !this.lastCol && !this.lastRow) {
      this.goLeft();      
      this.upDown = true;
    } else if (this.lastThree){
      this.goUp();
      this.lastThree = false;
    } else if (this.lastRow) {
      const row = this.rowPos.s;
      const pos = this.data[row].s;
      let letter = this.keys[row][pos];
      this.selectLetter(letter);
    } else {
      const row = this.rowPos.s;
      const pos = this.data[row].s;
      let letter = this.keys[row][pos];
      this.selectLetter(letter);
    }
  }

  rightKeyPress() {
    if (this.inputMode == false){
      this.inputMode = true;
    } else if (this.upDown && !this.lastCol && !this.lastRow) {
      this.goDown();
      this.upDown = false;
    } else if (!this.upDown && !this.lastCol && !this.lastRow) {
      this.goRight();      
      this.upDown = true;
    } else if (this.lastThree){
      const row = this.rowPos.e - 1;
      const pos = this.data[row].s;
      let letter = this.keys[row][pos];
      this.selectLetter(letter);
    } else if (this.lastRow) {
      const row = this.rowPos.s;
      const pos = this.data[row].e - 1;
      let letter = this.keys[row][pos];
      this.selectLetter(letter);
    } else {
      const row = this.rowPos.e - 1;
      const pos = this.data[row].s;
      let letter = this.keys[row][pos];
      this.selectLetter(letter);
    }

  }

  goLeft(){
    let max = 0;
    this.data.forEach(item => {
      item.e = Math.ceil((item.s + item.e) / 2);


      
    });
    // if (this.moves == 1) this.upDown = true;
    this.calcLengths();
  }

  goRight(){
    let fifthRow = false;
    let thirdRow = false;

    this.data.forEach(row => {
      row.s = Math.ceil((row.s + row.e) / 2);
      
      if(row.s == 5) {
        fifthRow = true;
      }

    });

    if(fifthRow) {
      this.data[2].e = this.data[2].s;
      this.rowPos.e--;
      this.rowPos.m = Math.ceil((this.rowPos.s + this.rowPos.e) / 2);
    }
    // if (this.moves == 1) this.upDown = true;
    this.calcLengths();
  }

  goUp(){    
    let max = 0;
    this.rowPos.e = Math.ceil((this.rowPos.s + this.rowPos.e) / 2);
    this.rowPos.m = Math.ceil((this.rowPos.s + this.rowPos.e) / 2);
    this.data.forEach((item, i) => {
      if(i >= this.rowPos.e){
        item.e = item.s;
      } else {
        if (item.e != 0){
          item.e >= max ? max = item.e : item.e = max;
          item.e = max;
        }
      }
    });

    this.calcLengths();
  }

  goDown(){
    this.rowPos.s = Math.ceil((this.rowPos.s + this.rowPos.e) / 2);
    this.rowPos.m = Math.ceil((this.rowPos.s + this.rowPos.e) / 2);

    this.data.forEach((item, i) => {
      if(i < this.rowPos.s){
        item.e = item.s;
      }
    });
    this.calcLengths();
  }



  calcLengths(){

    this.lastRow = this.rowPos.e - this.rowPos.s == 1;

    let itemCount = 0;
    this.data.forEach(item => {
      item.l =  item.e - item.s;

      if (item.l == 1){
        itemCount++;
      }
    });
    
    if(!this.lastRow  && itemCount == 2) {
      this.lastCol = true;
    }

    if(!this.lastRow  && itemCount == 3) {
      this.lastCol = true;
      this.lastThree = true;
    }
  }

  selectLetter(letter: string) {
    this.test.addLetter(letter, this.keyStrokes);
    this.keyStrokes = 0;
    this.reset();
  }

  reset(){
    this.data = [];
    this.keys.forEach((row) => {
      this.data.push({
        "s":  0,
        'e': row.length,
        'l': row.length
      })
    });

    this.rowPos = {
      s: 0,
      e: 5,
      m: 3
    }
    this.lastCol = false;
    this.lastRow = false;
    this.lastThree = false;
    this.upDown = false;
    this.inputMode = false;
    this.calcLengths();
    this.clearAllTimeouts();
  }

  startTimer2() {
    this.clearAllTimeouts();
    this.timeouts.push(setTimeout( () => {
      if(this.inputMode) {
        this.reset();
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
    this.reset(),
    this.input = ""
  }

}
