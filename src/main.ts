import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import appConfig from './app/app.config';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, appConfig
).catch(err => console.error(err));
