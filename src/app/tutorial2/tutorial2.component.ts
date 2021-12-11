import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-tutorial2',
  templateUrl: './tutorial2.component.html',
  styleUrls: ['./tutorial2.component.scss']
})
export class Tutorial2Component implements OnInit, OnDestroy {

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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  next(){
    this.router.navigate(['tutorial-3'])
  }

}
