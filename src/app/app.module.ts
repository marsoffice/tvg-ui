import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AuthErrorComponent } from './auth-error/auth-error.component';
import { AuthService } from './services/auth.service';
import { EasyAuthInterceptor } from './services/easy-auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { FunctionProxyInterceptor } from './services/function-proxy.interceptor';
import { ConfirmationModule } from './shared/confirmation/confirmation.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { JobsComponent } from './jobs/jobs.component';
import { VideosComponent } from './videos/videos.component';
import { AddEditJobComponent } from './add-edit-job/add-edit-job.component';
import { CronModule } from './shared/cron/cron.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GeneralComponent } from './add-edit-job/general/general.component';
import { ContentComponent } from './add-edit-job/content/content.component';
import { SpeechComponent } from './add-edit-job/speech/speech.component';
import { AudioBackgroundComponent } from './add-edit-job/audio-background/audio-background.component';
import { VideoBackgroundComponent } from './add-edit-job/video-background/video-background.component';
import { TextBoxComponent } from './add-edit-job/text-box/text-box.component';
import { UploadSettingsComponent } from './add-edit-job/upload-settings/upload-settings.component';
import {MatSelectModule} from '@angular/material/select';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';



const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  if (!environment.production) {
    console.log(message);
  }
  if (logLevel !== LogLevel.Error) {
    return;
  }
  AuthService.logStore = message;
}

const additionalProviders: Provider[] = [];

if (!environment.production) {
  additionalProviders.push({
    provide: HTTP_INTERCEPTORS,
    useClass: EasyAuthInterceptor,
    multi: true,
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoggedOutComponent,
    SidenavComponent,
    AuthErrorComponent,
    UserSettingsComponent,
    JobsComponent,
    VideosComponent,
    AddEditJobComponent,
    GeneralComponent,
    ContentComponent,
    SpeechComponent,
    AudioBackgroundComponent,
    VideoBackgroundComponent,
    TextBoxComponent,
    UploadSettingsComponent,
    OauthCallbackComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    CronModule,

    MatChipsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ConfirmationModule,
    MatStepperModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,



    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.adclientid,
          authority: `https://login.microsoftonline.com/${environment.adtenantid}`,
          redirectUri: window.location.origin + "/",
          navigateToLoginRequestUrl: true,
          postLogoutRedirectUri: '/logged-out',
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: isIE,
        },
        system: {
          loggerOptions: {
            loggerCallback: loggerCallback,
            logLevel: !environment.production ? LogLevel.Info : LogLevel.Error,
            piiLoggingEnabled: !environment.production
          },
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        loginFailedRoute: '/auth-error',
        authRequest: {
          scopes: [],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map<
          string,
          (string | ProtectedResourceScopes)[] | null
        >(
          [
            ["https://graph.microsoft.com", ["user.read"]],
            ["/api", [environment.adclientid + '/.default']]
          ]
        ),
      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FunctionProxyInterceptor,
      multi: true,
    },
    ...additionalProviders,
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule { }
