export interface ApiEntityExtraction {
  annotations: {
    confidence: number;
    spot: string;
    types?: string[];
    categories?: string[];
    abstract?: string;
    lod: {
      wikipedia: string;
      dbpedia: string;
    };
    alternateLabels?: string[];
    image?: {
      full: string;
      thumbnail: string;
    };
  }[];
}

export interface Sentiment{
  score: number;
  type: string;
}

export interface DetectedLanguages{
  confidence: number;
  lang: string;
}

export interface EntityExtraction {
  spot : string
  categories? : string[]
  abstract? : string
  image? : Image
}

export interface Image {
  full:string,
  thumbnail: string
}

export interface History {
  endpoint:string,
  method: string,
  timestamp:Date
}
