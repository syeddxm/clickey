import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {


  message = "GET READY"

  timeouts: any[] = [];
  
  stage = 0;
  leftPressed = false;
  rightPressed = false;
  tutorialActive = false;
  tutorialEnded = false;

  spinner = 0;

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: any) {
    console.log(event);
    if ("Shift" === event.key) {
      console.log(event);
      if (1 == event.location){
        this.leftKeyPress();
      } else if (2 == event.location) {
        this.rightKeyPress();
      }
    }
  }

  leftKeyPress(){
    if(this.stage == 1){
      this.leftPressed = true;
      this.displayRight();
    }
  }

  rightKeyPress(){
    if(this.stage == 2){
      this.rightPressed = true;
      this.endTutorial();
    }
  }
  
  

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  clearTimeouts(){
    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    })
  }

  startTutorial(){
    this.tutorialActive = true;
    this.startSpinner();

    this.timeouts.push(setTimeout(()=>{          
      this.displayLeft();
    }, 5000));    
  }

  displayLeft(){
    this.clearTimeouts();
    this.stage = 1;
    this.message = "LEFT";
    this.startSpinner();
    this.timeouts.push(setTimeout(()=>{          
      if(!this.leftPressed) {
        this.reset();
      }
    }, 5000));
  }

  displayRight(){
    this.clearTimeouts();
    this.stage = 2;
    this.message = "RIGHT"
    this.startSpinner();
    this.timeouts.push(setTimeout(()=>{          
      if(!this.rightPressed) {
        this.startAgain();
      }
    }, 5000));
  }

  endTutorial(){
    this.message = "END"
    this.spinner = 0;
    this.tutorialEnded= true;
    this.clearTimeouts();
  }

  reset(){
    this.clearTimeouts();
    this.leftPressed = false;
    this.rightPressed= false;
    this.message = "START"
    this.tutorialActive = false;
    this.spinner = 0;
  }

  startAgain(){
    this.message = "INCORRECT / TIMEOUT, STARTING AGAIN"
    this.timeouts.push(setTimeout(()=>{          
        this.reset();
    }, 5000))
    
  }

  startSpinner () {
    this.spinner = 0;
    this.addTimer();
  }

  addTimer () {
    if(this.spinner <= 4){
      this.timeouts.push(setTimeout(()=>{
        console.log(this.spinner);
        this.spinner++;
        this.addTimer();    
      }, 1000));
    }
  }


  next() {
    this.router.navigate(['tutorial-1']);
  }
  

}
