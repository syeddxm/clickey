import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-qwerty-scan',
  templateUrl: './qwerty-scan.component.html',
  styleUrls: ['./qwerty-scan.component.scss']
})
export class QwertyScanComponent implements OnInit {

  testActive = false;

  input = "";
  inputMode = false;
  bottomStage = false;

  mode1 = {
    keys: [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], 
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"], 
      ["Z", "X", "C","_", "V", "B", "N", "M"]
    ],
    stages: {
      s1 : -1,
      s2: -1
    },
  }

  mode: any;
  stages : any;

  currentVisible = -1;
  timeouts: any[] = [];
  delay = 1000;

  keys: any;

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

  ngOnInit(){
    this.mode = this.mode1;
    this.keys = this.mode.keys;
    this.stages = this.mode.stages;
  }

  clearAllTimeouts() {
    while(this.timeouts.length)  {
      clearTimeout(this.timeouts.pop()!);
    }    
  }

  startTimer(n: any) {
    this.timeouts.push(setTimeout( () => {
      if(this.inputMode) {
        if(this.stages.s1 == -1) {
          this.reset();
        } else if (this.stages.s2 == -1) {
          this.reset();
        }
      }
    }
    , this.delay * n))
  }

  traverseArray(arr: any[]) {
    this.inputMode = true;
    let r = this;
    this.startTimer(arr.length);
    this.currentVisible = 0;
    for (let i = 1; i < arr.length; i++) {
      this.timeouts.push(setTimeout(()=>{
          r.currentVisible = i;
      }, this.delay * i));
    }
  }

  singleKeyPress(){
    this.clearAllTimeouts();  
    if (this.inputMode == false) {
      this.traverseArray(this.keys);
    } else if (this.stages.s1 == -1) {
      this.stages.s1 = this.currentVisible;
      this.traverseArray(this.keys[this.stages.s1]);
      
    } else {
      this.stages.s2 = this.currentVisible;
      this.selectLetter();
    }
  }

  leftKeyPress() {
    this.singleKeyPress();
  }

  rightKeyPress() {
    this.singleKeyPress();
  } 

  reset() {
    this.inputMode = false;
    this.currentVisible = -1;
    this.stages = {
      s1 : -1,
      s2: -1
    }
    this.clearAllTimeouts()
  }

  selectLetter() {
    let n = this.keys[this.stages.s1][this.stages.s2];
    this.test.addLetter(n, this.keyStrokes);
    this.keyStrokes = 0;
    this.reset();
  }

    
  resetInput() {
    this.reset(),
    this.input = ""
  }

}
