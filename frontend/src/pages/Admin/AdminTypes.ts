
export interface Review {
  review: string;
  reviewBy: string;
  rating: string;
  [key: string]: string;
}

export type RegExes = { [key: string]: RegExp };


export interface Movie {
  id: number | null;
  title: string;
  ageRating: string;
  createdAt: string | null;
  cast: string;
  directedBy: string;
  duration: string;
  slideFile: null | File;
  slidePreview: string;
  slideURL: string;
  posterFile: null | File;
  posterPreview: string;
  posterURL: string;
  postersFiles: null | File[];
  postersPreviews: string;
  postersURLS: string;
  trailerURL: string;
  subtitles: string;
  spokenLanguage: string;
  description: string;
  releaseYear: string;
  [key: string]: string | string[] | null | File | File[] | number;
}

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