import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-begin',
  templateUrl: './test-begin.component.html',
  styleUrls: ['./test-begin.component.scss']
})
export class TestBeginComponent implements OnInit {

  testEnded = false;
  active = false;
  phrase = ""
  header = ""
  message = ""
  curr = -1;

  phrases = ["WHAT_A_BEAUTIFUL_DAY_IT_IS", "BETWEEN_A_ROCK_AND_A_HARD_PLACE"]

  headers = ['SCAN', 'RECURSION']
  messages = ['Use either shift key', 'Left shift key to select yellow, Right Shift key to select blue'];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.testActive.subscribe(val => {
      this.active = val;
    });

    this.testService.beginTest();

    this.testService.currTest.subscribe(val => {
      this.curr = this.testService.testOrder[val];
      this.phrase = this.phrases[this.curr < 4? 0: 1];
      this.header = this.headers[this.curr % 2]
      this.message = this.messages[this.curr % 2]
      if(this.testService.curr == 8){
        this.header = "Test ended";
        this.message = "Please send downloaded csv file";
      }
    });
  }

  beginTest(){

  }

  nextTest(){}

}
