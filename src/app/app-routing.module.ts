import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { StartComponent } from './start/start.component';
import { TestBeginComponent } from './test-begin/test-begin.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { Tutorial1Component } from './tutorial1/tutorial1.component';
import { Tutorial2Component } from './tutorial2/tutorial2.component';
import { Tutorial3Component } from './tutorial3/tutorial3.component';
import { Tutorial4Component } from './tutorial4/tutorial4.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'tutorial-1', component: Tutorial1Component },
  { path: 'tutorial-2', component: Tutorial2Component },
  { path: 'tutorial-3', component: Tutorial3Component },  { path: 'tutorial-2', component: Tutorial2Component },
  { path: 'tutorial-4', component: Tutorial4Component },
  { path: 'test-begin', component: TestBeginComponent },
  { path: 'test/:id', component: TestBeginComponent },

  // { path: 'second-component', component: SecondComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }