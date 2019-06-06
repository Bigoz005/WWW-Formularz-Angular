import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LanguageCheckboxComponent } from './components/language-checkbox/language-checkbox.component';
import { IndicatorDotComponent } from './components/indicator-dot/indicator-dot.component';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    LanguageCheckboxComponent,
    IndicatorDotComponent,
    InputWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
