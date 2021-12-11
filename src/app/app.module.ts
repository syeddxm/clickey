import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { QwertyScanComponent } from './qwerty-scan/qwerty-scan.component';
import { QwertyRecurComponent } from './qwerty-recur/qwerty-recur.component';
import { FreqScanComponent } from './freq-scan/freq-scan.component';
import { FreqRecurComponent } from './freq-recur/freq-recur.component';
import { StartComponent } from './start/start.component';
import { TutorialComponent } from './tutorial/tutorial.component'
import { Tutorial1Component } from './tutorial1/tutorial1.component'
import { Tutorial2Component } from './tutorial2/tutorial2.component'
import { Tutorial3Component } from './tutorial3/tutorial3.component'
import { Tutorial4Component } from './tutorial4/tutorial4.component'
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule  } from './material.module'
import { TestBeginComponent } from './test-begin/test-begin.component';
@NgModule({
  declarations: [
    AppComponent,
    QwertyScanComponent,
    QwertyRecurComponent,
    FreqScanComponent,
    FreqRecurComponent,
    StartComponent,
    TutorialComponent,
    Tutorial1Component,
    Tutorial2Component,
    Tutorial3Component,
    Tutorial4Component,
    TestComponent,
    TestBeginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
