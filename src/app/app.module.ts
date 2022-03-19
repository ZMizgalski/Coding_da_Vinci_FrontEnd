import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './router-components/main-nav/main-nav.component';
import { TopNavComponent } from './utils-components/top-nav/top-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
