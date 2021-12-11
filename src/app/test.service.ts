import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private _input = new BehaviorSubject<string>('');
  readonly input = this._input.asObservable();

  private _testActive = new BehaviorSubject<boolean>(false);
  readonly testActive = this._testActive.asObservable();

  private _passed = new BehaviorSubject<boolean>(false);
  readonly passed = this._passed.asObservable();

  data: any[][] = [];
  curr = -1;
  length = 0;
  target = "";  
  practice = false;
  timeElapsed = 0;

  startTime: number  = 0;

  testOrder = [0, 1, 2, 3, 4, 5, 6, 7];

  testStarted = false;
  private _currTest = new BehaviorSubject<number>(-1);
  readonly currTest = this._currTest.asObservable();

  keyStrokes = 0;
  totalChars = 0;

  constructor() { }

  addLetter(l: string, keyStrokes: number){
    let input = this._input.value + l;
    this.curr++;
    this.keyStrokes += keyStrokes;
    this._input.next(input);
    if(this.curr == this.length - 1) {
      this._testActive.next(false);
      this.endTest();
    }    
  }

  endTest(){
    this.timeElapsed = (Date.now() - this.startTime)/1000;
    
    if (this.practice){
        this._passed.next(true);
    } else {
      let curr = this.testOrder[this._currTest.value];
      let kspc = this.keyStrokes / this.length;
      let msd = this.MSD(this._input.value, this.target);
      let errorRate = msd / (this.target.length) * 100;

      if(this._currTest.value == 7) {
        this._currTest.next(this._currTest.value +  1);
        this.data.push([curr, this.target.length, this.timeElapsed, kspc, msd, errorRate])
        this._testActive.next(false);      
        this.downloadData();
      } else {
        this.data.push([curr, this.target.length, this.timeElapsed, kspc, msd, errorRate])
        console.log("NEXT TEST");
        this._currTest.next(this._currTest.value +  1);
      }
    }      

  }

  startTest(target: string, practice: boolean){

    this.reset();
    this.keyStrokes = 0;
    this.practice = practice;
    this.startTime = Date.now();
    this._testActive.next(true);

    this.target = target;
    this.length = target.length;
    this.curr = -1;
  }

  reset(){
    this._input.next('');
    
    if (this.practice){
      this._passed.next(false);
    }
  }

  shuffleArray(array: number[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  beginTest(){    
    this.shuffleArray(this.testOrder);
    console.log(this.testOrder);
    this._currTest.next(this._currTest.value + 1)
    this.data = [['test_number', 'length', 'time', 'kspc', 'msd', 'errorRate']];
  }

  downloadData(){
    let csvContent = "data:text/csv;charset=utf-8," 
    + this.data.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  }

  r(x:any ,y:any){
    if (x == y) return 0;
    return 1
  }

  MSD(Astr: string, Bstr: string){

    let A = Astr.split('');
    let B = Bstr.split('');

    var D = [];
    for(var i=0; i<= A.length; i++) {
        D[i] = new Array(B.length);
    }

    for(let i = 0; i <= A.length; i++){
      D[i][0] = i;
    }
    for(let j = 0; j <= B.length; j++){
      D[0][j] = j;
    }
    
    for(let i = 1; i <= A.length; i++){
      for(let j = 1; j <= B.length; j++){
        let a = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1);
        let b = D[i - 1][j - 1] + this.r(A[i], B[j]);
        D[i][j] = Math.min(a, b);        
      }
    }

    return D[A.length][B.length];
  }

  /*


  */
  
}
