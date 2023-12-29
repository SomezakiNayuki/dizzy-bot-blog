import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { AboutMeComponent } from 'src/app/components/pages/about-me/about-me.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { ExperienceCard } from 'src/app/components/components/experience-card/experience-card.component';
import { PersonalInfoCardComponent } from 'src/app/components/components/personal-info-card/personal-info-card.component';
import { PageNavigationService } from 'src/app/services/page-navigation.service';
import { CreateContentComponent } from 'src/app/components/components/create-content/create-content.component';
import { BlogItemComponent } from 'src/app/components/components/blog-item/blog-item.component';
import { LoginModalComponent } from 'src/app/components/components/login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelPipe } from 'src/app/pipes/label.pipe';
import { TimePipe } from 'src/app/pipes/time.pipe';

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
    LoginModalComponent,
    
    LabelPipe,
    TimePipe
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
