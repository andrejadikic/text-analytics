import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EntityExtractionComponent} from "./entity-extraction/entity-extraction.component";
import {TextSimilarityComponent} from "./text-similarity/text-similarity.component";
import {LanguageDetectionComponent} from "./language-detection/language-detection.component";
import {SentimentAnalysisComponent} from "./sentiment-analysis/sentiment-analysis.component";
import {authorizationGuard} from "./authorization.guard";
import {HistoryComponent} from "./history/history.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "entity-extraction",
    component: EntityExtractionComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "text-similarity",
    component: TextSimilarityComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "language-detection",
    component: LanguageDetectionComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "sentiment-analysis",
    component: SentimentAnalysisComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "history",
    component: HistoryComponent,
    canActivate: [authorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
