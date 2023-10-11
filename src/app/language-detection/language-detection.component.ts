import {Component, OnInit} from '@angular/core';
import {DetectedLanguages, EntityExtraction} from "../model";
import {DandelionService} from "../services/dandelion.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent {
  clean: boolean = false
  text: string = ''
  detectedLanguages: DetectedLanguages[] = [];
  constructor(private postService: DandelionService) { }

  extract(): void{
    const params = new HttpParams()
      .set('text', this.text)
      .set('clean', this.clean)
      .set('token', localStorage.getItem("token") || '');

    this.postService.detectLang(params).subscribe({
        next: languages => this.detectedLanguages = languages,
        error: err => console.log(err),
      }
    );
  }

}

