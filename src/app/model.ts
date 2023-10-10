
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

//   "abstract": "A physician is a professional who practices medicine, which is concerned with promoting, maintaining or restoring human health through the study, diagnosis, and treatment of disease, injury, and other physical and mental impairments. They may focus their practice on certain disease categories, types of patients, or methods of treatment \u2013 known as specialist medical practitioners \u2013 or assume responsibility for the provision of continuing and comprehensive medical care to individuals, families, and communities \u2013 known as general practitioners. Medical practice properly requires both a detailed knowledge of the academic disciplines (such as anatomy and physiology) underlying diseases and their treatment \u2013 the science of medicine \u2013 and also a decent competence in its applied practice \u2013 the art or craft of medicine.",
//   "title": "Physician",
//   "start": 4,
//   "categories": [
//   "Physicians",
//   "Healthcare occupations",
//   "Occupations"
// ],
//   "lod": {
//   "wikipedia": "http://en.wikipedia.org/wiki/Physician",
//     "dbpedia": "http://dbpedia.org/resource/Physician"
// },
// "label": "Physician",
//   "types": [],
//   "confidence": 0.438,
//   "uri": "http://en.wikipedia.org/wiki/Physician",
//   "end": 10,
//   "spot": "doctor"
// {"full":"https://commons.wikimedia.org/wiki/Special:FilePath/Apple_logo_black.svg","thumbnail":"https://commons.wikimedia.org/wiki/Special:FilePath/Apple_logo_black.svg?width\u003d300"}}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}
