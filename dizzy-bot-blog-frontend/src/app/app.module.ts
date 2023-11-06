import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { AboutMeComponent } from './components/pages/about-me/about-me.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ExperienceCard } from './components/components/experience-card/experience-card.component';
import { PersonalInfoCardComponent } from './components/components/personal-info-card/personal-info-card.component';
import { PageNavigationService } from './services/page-navigation.service';
import { CreateContentComponent } from './components/components/create-content/create-content.component';
import { BlogItemComponent } from './components/components/blog-item/blog-item.component';
import { LoginModalComponent } from './components/components/login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutMeComponent,
    HomeComponent,
    ExperienceCard,
    PersonalInfoCardComponent,
    CreateContentComponent,
    BlogItemComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PageNavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
