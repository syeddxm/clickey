import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-tutorial3',
  templateUrl: './tutorial3.component.html',
  styleUrls: ['./tutorial3.component.scss']
})
export class Tutorial3Component implements OnInit {

  testPassed = false;
  active = false;

  private sub: Subscription = new Subscription();

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit(): void {
    this.sub.add(this.testService.passed.subscribe(val => {
      this.testPassed = val;
      console.log(val);
    }));
    
    this.sub.add(this.testService.testActive.subscribe(val => {
      this.active = val;
    }));

    this.testService.reset();

  }

  next(){
    this.router.navigate(['tutorial-4'])
  }

}
