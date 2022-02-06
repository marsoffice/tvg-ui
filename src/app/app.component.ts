import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { SwPush } from '@angular/service-worker';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Claims } from './models/claims';
import { NotificationDto } from './models/notification.dto';
import { Severity } from './models/severity';
import { AuthService } from './services/auth.service';
import { HubService, SignalrObservableWrapper } from './services/hub.service';
import { PushSubscriptionsService } from './services/push-subscriptions.service';
import { UpdateService } from './services/update.service';
import { ToastService } from './shared/toast/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isIframe = false;
  isMobile = true;
  private _destroy: Subscription[] = [];
  private notifSubscription: Subscription | undefined;
  user: Claims | undefined;
  private realTimeNotifObs: SignalrObservableWrapper<NotificationDto> | null = null;

  constructor(private msalService: MsalService, private mediaObserver: MediaObserver,
    private authService: AuthService,
    private hubService: HubService,
    private pushSubscriptionsService: PushSubscriptionsService,
    private swPush: SwPush,
    private updateService: UpdateService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.initHub();

    this.initMediaObserver();
  }


  private initMediaObserver() {
    this._destroy.push(
      this.mediaObserver.asObservable().subscribe(() => {
        this.isMobile = this.mediaObserver.isActive('xs');
      })
    );
  }

  private initHub() {
    this._destroy.push(
      this.authService.user.subscribe(u => {
        this.user = u;
        if (this.user != null) {
          this.realTimeNotifObs = this.hubService.subscribe('notificationReceived');

          this.notifSubscription = this.realTimeNotifObs.observable.subscribe(notif => {
            switch (notif.severity) {
              case Severity.Success:
                this.toastService.showSuccess(notif.message, notif.title);
                break;
              case Severity.Warn:
                this.toastService.showWarn(notif.message, notif.title);
                break;
              case Severity.Error:
                this.toastService.showError(notif.message, notif.title);
                break;
              case Severity.Info:
              default:
                this.toastService.showInfo(notif.message, notif.title);
                break;
            }
          });

          this._destroy.push(this.notifSubscription);

          this.hubService.start().subscribe();
          this.initPush();
        } else {
          if (this.realTimeNotifObs != null) {
            this.realTimeNotifObs.kill();
            this.notifSubscription?.unsubscribe();
          }
          this.hubService.stop().subscribe();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.authService.destroy();
    this._destroy.forEach(x => x.unsubscribe());
  }

  private initPush() {
    if (!this.swPush.isEnabled) {
      return;
    }
    this.swPush.subscription.subscribe(currentSub => {
      if (currentSub == null) {
        this.swPush.requestSubscription({
          serverPublicKey: environment.publicvapidkey
        }).then(ps => {
          this.pushSubscriptionsService.addPushSubscription({
            userId: this.user?.id,
            subscriptionJson: JSON.stringify(ps.toJSON())
          }).subscribe();
        });
      }
    });
  }
}
