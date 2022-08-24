import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReadMoreDirectiveModule } from '../../../read-more-directive/src/lib/read-more-directive.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReadMoreDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
