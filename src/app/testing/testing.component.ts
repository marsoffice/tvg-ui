import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  cmd = 'ls -alh';
  constructor(private srv: SpeechService) { }

  ngOnInit(): void {
  }

  go() {
    this.srv.test(this.cmd).subscribe({
      next: x => {
        console.log(x);
        alert("Response: " + JSON.stringify(x));
      },
      error: e => {
        console.error(e);
        alert("Error: " + JSON.stringify(e));
      }
    });
  }
}
