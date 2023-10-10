import { Component } from '@angular/core';
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  token: string;

  constructor(private historyService: HistoryService) {
    this.token = this.historyService.getToken();
  }
  setToken() {
    this.historyService.setToken(this.token);
  }

}
