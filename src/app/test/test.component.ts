import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() target = '';
  @Input() practice = false;

  showTest = false;
  length = 0;
  curr = 0;
  targetArr: string[] = [];
  inputArr: string[] = [];


  constructor(private test: TestService) { }

  ngOnInit(): void {
    this.test.testActive.subscribe( val => {
      this.showTest = !val;
    });
  }

  startTest(){
    this.test.startTest(this.target, this.practice);

    this.targetArr = this.test.target.split('');
    let l = this.test.target.length;
    this.inputArr = Array.from('*'.repeat(l));    
    this.length = this.test.target.length;

    this.test.input.subscribe((a: string) => {
      this.curr = this.test.curr;
      if (a.length > 0) {
        this.inputArr[this.curr] = a[a.length -1];
      }
    });
  }
}
