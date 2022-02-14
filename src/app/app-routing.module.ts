import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AddEditJobComponent } from './add-edit-job/add-edit-job.component';
import { AuthErrorComponent } from './auth-error/auth-error.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestingComponent } from './testing/testing.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'testing',
    component: TestingComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'logged-out',
    component: LoggedOutComponent,
  },
  {
    path: 'auth-error',
    component: AuthErrorComponent,
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'jobs/add',
    component: AddEditJobComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'jobs/:id',
    component: AddEditJobComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'jobs/:id/videos',
   component: VideosComponent,
   canActivate: [MsalGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled', // Don't perform initial navigation in iframes
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
