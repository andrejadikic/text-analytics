import {Component, OnInit} from '@angular/core';
import {EntityExtraction} from "../model";
import {DandelionService} from "../services/dandelion.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent{
  text1:string = '';
  text2:string = '';
  similarity: number = 0;

  constructor(private postService: DandelionService) { }

  compare(): void{
    const params = new HttpParams()
      .set('text1', this.text1)
      .set('text2', this.text2)
      .set('token', localStorage.getItem("token") || '');

    this.postService.compareText(params).subscribe({
        next: entities => this.similarity = entities,
        error: err => console.log(err),
      }
    );
  }
}
