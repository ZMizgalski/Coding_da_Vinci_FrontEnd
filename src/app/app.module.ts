import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './router-components/main-nav/main-nav.component';
import { TopNavComponent } from './utils-components/top-nav/top-nav.component';
import { HomeComponent } from './router-components/home/home.component';
import { CollectionComponent } from './router-components/collection/collection.component';
import { AboutComponent } from './router-components/about/about.component';
import { MixerComponent } from './router-components/mixer/mixer.component';
import { NotFoundComponent } from './router-components/not-found/not-found.component';
import { ImageBrowserComponent } from './utils-components/image-browser/image-browser.component';
import { HttpClientModule } from '@angular/common/http';
import { ResizeDirective } from './services/resize-handler/resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResizeDirective,
    MainNavComponent,
    TopNavComponent,
    HomeComponent,
    CollectionComponent,
    AboutComponent,
    MixerComponent,
    NotFoundComponent,
    ImageBrowserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ResizeDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
