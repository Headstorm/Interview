import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaModule} from 'ng-recaptcha';

import {ContactDetailsFormComponent} from './contact-details-form/contact-details-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    RecaptchaModule
  ],
  providers: [{provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LftEI0aAAAAADIFh-xP12sxtVk0UWYkccP5Fe83'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
