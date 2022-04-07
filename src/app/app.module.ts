import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GeneticAlgorithmsComponent } from './components/genetic-algorithms/genetic-algorithms.component';
import { ShortestPathComponent } from './components/shortest-path/shortest-path.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GeneticAlgorithmsComponent,
    ShortestPathComponent,
    NotFoundPageComponent,
    DocumentationComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
