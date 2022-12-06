import { KMeansComponent } from './components/k-means/k-means.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneticAlgorithmsComponent } from './components/genetic-algorithms/genetic-algorithms.component';
import { ShortestPathComponent } from './components/shortest-path/shortest-path.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: GeneticAlgorithmsComponent,
  },
  {
    path: 'shortest-path',
    component: ShortestPathComponent,
  },
  {
    path: 'k-means',
    component: KMeansComponent,
  },
  {
    path: 'documentation',
    component: DocumentationComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
