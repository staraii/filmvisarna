
export interface Review {
  review: string;
  reviewBy: string;
  rating: string;
  [key: string]: string;
}

export type RegExes = { [key: string]: RegExp };


export type Movie = {[key: string]: string}


export type TextInputParams = {
  controlId: string;
  label: string;
  type: string;
  name: string;
  feedback: string;
};
export type TextInputParamsList = { [key: string]: TextInputParams };



interface SingleImage {
  preview: string | null;
  url: string | null;
  [key: string]: string | null;
}
interface ImagesList {
  previews: string[];
  urls: string[];
  [key: string]: string[];
}

export interface ImagesStateDefault {
  slide: SingleImage;
  poster: SingleImage;
  postersList: ImagesList;
  [key: string]: SingleImage | ImagesList;
}

export interface FilesDefault {
  poster: null | File;
  slide: null | File;
  postersList: File[];
}