import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {EntityExtraction, ApiEntityExtraction} from "../model";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class DandelionService {

  private readonly apiUrl = environment.dandelionApi;
  private readonly entityUrl = environment.entityUrl;
  private readonly textUrl  = environment.textUrl;
  private readonly languageUrl = environment.languageUrl;
  private readonly sentimentUrl = environment.sentimentUrl;

  constructor(private httpClient: HttpClient, private historyService: HistoryService) {
  }

  // treba da vratimo inteface jer observable ne instancira novi objekat neke klase nego vraca plain objekat jer je
  // json obican objekat bez metoda i kad bi probali da na njemu pozovemo neku metodu pukao bi exception
  // interface je opis odgovora servera
  // u getu startuje akcija tek kad kazemo subscribe u postlist compo

  getFlightPlans(): Observable<EntityExtraction[]> {
    const params = new HttpParams()
      .set('text', 'The doctor says an apple is better  than  an orange')
      .set('include', 'abstract,image')
      .set('token', this.historyService.getToken());
    return this.httpClient.get<any[]>(`${this.apiUrl}`+ `${this.entityUrl}`, {params})
      .pipe(
      map((flightPlans) =>
        flightPlans.map((response) => {
          // @ts-ignore
          return response.annotations.map(annotation => ({
            spot: annotation.spot,
            categories: annotation.categories,
            abstract: annotation.abstract,
            image: annotation.image ? {
              full: annotation.image.full,
              thumbnail: annotation.image.thumbnail
            } : undefined
          }));
        })
      )
    );
  }




  getPosts(): Observable<EntityExtraction[]> {
    const params = new HttpParams()
      .set('lang', 'en')
      .set('text', "The doctor says an apple is better than an orange")
      .set('include', 'types,categories,abstract,image')
      .set('token', localStorage.getItem("token") || '');
    return this.httpClient.get<ApiEntityExtraction>(`${this.apiUrl}`+ `${this.entityUrl}`, {params})
      .pipe(
        map((response: ApiEntityExtraction) => {
          return response.annotations.map(annotation => ({
            spot: annotation.spot,
            categories: annotation.categories,
            abstract: annotation.abstract,
            image: annotation.image ? {
              full: annotation.image.full,
              thumbnail: annotation.image.thumbnail
            } : undefined
          }));
        })
      );
  }

  extractEntities(params: HttpParams): Observable<EntityExtraction[]> {
    return this.httpClient.get<ApiEntityExtraction>(`${this.apiUrl}`+ `${this.entityUrl}`, {params})
      .pipe(
        map((response: ApiEntityExtraction) => {
          return response.annotations.map(annotation => ({
            spot: annotation.spot,
            categories: annotation.categories,
            abstract: annotation.abstract,
            image: annotation.image ? {
              full: annotation.image.full,
              thumbnail: annotation.image.thumbnail
            } : undefined
          }));
        })
      );
  }
}
