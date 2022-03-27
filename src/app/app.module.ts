import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './router-components/main-nav/main-nav.component';
import { SideNavComponent } from './utils-components/side-nav/side-nav.component';
import { HomeComponent } from './router-components/home/home.component';
import { CollectionComponent } from './router-components/collection/collection.component';
import { AboutComponent } from './router-components/about/about.component';
import { MixerComponent } from './router-components/mixer/mixer.component';
import { NotFoundComponent } from './router-components/not-found/not-found.component';
import { ImageBrowserComponent } from './utils-components/image-browser/image-browser.component';
import { HttpClientModule } from '@angular/common/http';
import { ResizeDirective } from './services/resize-handler/resize.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MixerCartComponent } from './utils-components/mixer-cart/mixer-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizeDirective,
    MainNavComponent,
    SideNavComponent,
    HomeComponent,
    CollectionComponent,
    AboutComponent,
    MixerComponent,
    NotFoundComponent,
    ImageBrowserComponent,
    MixerCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [ResizeDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
