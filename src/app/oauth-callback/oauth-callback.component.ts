import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiktokService } from '../services/tiktok.service';
import { ToastService } from '../shared/toast/services/toast.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})
export class OauthCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tikTokService: TiktokService, private router: Router, private toast: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(qp => {
      if (!qp.code) {
        this.toast.showError('No code received');
        return;
      }

      this.tikTokService.addAccount({
        authCode: qp.code
      }).subscribe({
        next: () => {
          this.toast.showSuccess('TikTok account added successfully');
          this.router.navigate([`user-settings`]);
        },
        error: e => {
          this.toast.fromError(e);
        }
      });
    });
  }

}
