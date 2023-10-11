import { Injectable } from '@angular/core';
import {History} from "../model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private token: string;
  private history: History[];
  constructor() {
    this.token = '';
    this.history = [];
  }

  addHistory(endpoint:string, method:string){
    this.history.push({endpoint,timestamp:new Date(),method});
  }
  getHistory(): History[]{
    return this.history;
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem("token",token);
  }
}
