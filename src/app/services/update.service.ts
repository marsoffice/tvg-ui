import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, first, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from '../shared/confirmation/services/confirmation.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate, confirmationService: ConfirmationService,
    toastService: ToastService) {
    if (!environment.production) {
      return;
    }

    if (!updates.isEnabled) {
      toastService.showWarn("Automatic updates are not available");
      return;
    }
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everyOneHour$ = interval(60 * 60 * 1000);
    const everyOneHourOnceAppIsStable$ = concat(appIsStable$, everyOneHour$);

    updates.unrecoverable.subscribe(() => {
      toastService.showError("Update unrecoverable");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    updates.versionUpdates.subscribe(vu => {
      if (vu.type === 'VERSION_INSTALLATION_FAILED') {
        toastService.showError("Installation failed");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }
      if (vu.type === 'VERSION_DETECTED') {
        toastService.showInfo("New version detected, downloading...");
        return;
      }
      if (vu.type === 'VERSION_READY') {
        confirmationService.confirm("Version downloaded. Install now?").subscribe(r => {
          if (r) {
            updates.activateUpdate().then(() => {
              window.location.reload();
            });
          }
        });

      }
    });

    everyOneHourOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

    updates.checkForUpdate();
  }


}
