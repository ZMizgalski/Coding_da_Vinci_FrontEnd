import { NotFoundComponent } from './router-components/not-found/not-found.component';
import { AboutComponent } from './router-components/about/about.component';
import { MixerComponent } from './router-components/mixer/mixer.component';
import { CollectionComponent } from './router-components/collection/collection.component';
import { HomeComponent } from './router-components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'mixer', component: MixerComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
