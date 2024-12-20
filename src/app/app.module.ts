import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { HttpClientModule } from '@angular/common/http';
import { GameModule } from './game/game.module';
import { ClientModule } from './client/client.module';
import { LoanModule } from './loan/loan.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
declarations: [
    AppComponent,
],
imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CategoryModule,
    AuthorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GameModule,
    ClientModule,
    LoanModule,
    MatNativeDateModule,
    MatSnackBarModule,
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }