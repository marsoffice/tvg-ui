import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  panelOpenState = false;

  constructor(private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {

  }
}
