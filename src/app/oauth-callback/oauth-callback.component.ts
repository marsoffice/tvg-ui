import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OauthCallbackPayload } from '../models/oauth-callback-payload';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})
export class OauthCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(qp => {
      if (!qp.code) {
        window.postMessage({
          success: false,
          error: 'No code received',
          type: 'oauth-callback-payload'
        } as OauthCallbackPayload);
        window.close();
        return;
      }
      window.postMessage({
        success: true,
        code: qp.code,
        type: 'oauth-callback-payload'
      } as OauthCallbackPayload);
      window.close();
    });
  }

}
