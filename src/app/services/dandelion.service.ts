import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EntityExtraction, ApiEntityExtraction, Sentiment, DetectedLanguages} from "../model";
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

  extractEntities(params: HttpParams): Observable<EntityExtraction[]> {
    this.historyService.addHistory(`${this.apiUrl}`+ `${this.entityUrl}`+ "?" + params.toString(), "GET");
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

  compareText(params: HttpParams): Observable<number> {
    this.historyService.addHistory(`${this.apiUrl}`+ `${this.textUrl}`+ "?" + params.toString(), "GET");
    return this.httpClient.get<any>(`${this.apiUrl}`+ `${this.textUrl}`, {params})
      .pipe(
        map((response: any) => response.similarity as number)
      );
  }

  detectLang(params: HttpParams): Observable<DetectedLanguages[]> {
    this.historyService.addHistory(`${this.apiUrl}`+ `${this.languageUrl}`+ "?" + params.toString(), "GET");
    return this.httpClient.get<any>(`${this.apiUrl}`+ `${this.languageUrl}`, {params})
      .pipe(
        map((response: any) => response.detectedLangs as DetectedLanguages[])
      );
  }

  analyzeSentiment(params: HttpParams): Observable<Sentiment> {
    this.historyService.addHistory(`${this.apiUrl}`+ `${this.sentimentUrl}`+ "?" + params.toString(), "GET");
    return this.httpClient.get<any>(`${this.apiUrl}`+ `${this.sentimentUrl}`, {params})
      .pipe(
        map((response: any) => response.sentiment as Sentiment)
      );
  }
}

// treba da vratimo inteface jer observable ne instancira novi objekat neke klase nego vraca plain objekat jer je
// json obican objekat bez metoda i kad bi probali da na njemu pozovemo neku metodu pukao bi exception
// interface je opis odgovora servera
// u getu startuje akcija tek kad kazemo subscribe u postlist compo
