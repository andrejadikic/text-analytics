import {Component, OnInit} from '@angular/core';
import {EntityExtraction} from "../model";
import {DandelionService} from "../services/dandelion.service";
import {FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent implements OnInit{

  language: string = "auto"
  abstract: boolean = false
  categories: boolean = false
  image: boolean = false
  text: string = ''
  minConfidence: number = 0;
  entityExtractions: EntityExtraction[] = [];
  constructor(private postService: DandelionService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
        next: entities => this.entityExtractions = entities,
        error: err => console.log(err),
      }
    );
  }

  extract(): void{
    let include = '';

    if(this.abstract){
      include += "abstract";
    }
    if(include!==""){
      include += ",";
    }
    if(this.categories){
      include += "categories";
    }
    if(include!==""){
      include += ",";
    }
    if(this.image){
      include += "image";
    }
    const params = new HttpParams()
      .set('lang', this.language)
      .set('text', this.text)
      .set('include', include)
      .set('min_confidence', this.minConfidence)
      .set('token', localStorage.getItem("token") || '');


    console.log(this.language)
    console.log(this.text)
    console.log(include)
    console.log(this.minConfidence)

    this.postService.extractEntities(params).subscribe({
        next: entities => this.entityExtractions = entities,
        error: err => console.log(err),
      }
    );
  }

}
