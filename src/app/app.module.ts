import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SeatingComponent } from './seating/seating.component';
import { SeatingService } from './seating/seating.service';

@NgModule({
  declarations: [AppComponent, SeatingComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SeatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
