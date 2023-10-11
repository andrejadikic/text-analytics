import { Component } from '@angular/core';
import {DandelionService} from "../services/dandelion.service";
import {HttpParams} from "@angular/common/http";
import {Sentiment} from "../model";
import {style} from "@angular/animations";
import {colors} from "@angular/cli/src/utilities/color";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {

  language: string = "auto"
  text: string = ''
  similarity: Sentiment = {score:0, type:"neutral"}
  constructor(private postService: DandelionService) { }
  compare(): void{
    const params = new HttpParams()
      .set('text', this.text)
      .set('lang', this.language)
      .set('token', localStorage.getItem("token") || '');

    this.postService.analyzeSentiment(params).subscribe({
        next: entities => {console.log(entities)
          this.similarity = entities},
        error: err => console.log(err),
      }
    );
  }

  interpolate(): string {
    let color1="#ff0208";
    let color2 = "#00ff00";

    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);

    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    const interpolationFactor = (this.similarity.score + 1) / 2;
    const r = Math.round(r1 + (r2 - r1) * interpolationFactor);
    const g = Math.round(g1 + (g2 - g1) * interpolationFactor);
    const b = Math.round(b1 + (b2 - b1) * interpolationFactor);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
