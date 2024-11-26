export type Movie = { [key: string]: string };
export type Categories = string[];
export type Reviews = { [key: string]: string };

export type Images = {
  encodedPoster: string;
  encodedSlide: string;
  encodedPostersList: string[];
};
export type MovieBody = {
  movie: Movie;
  images: Images;
  reviews: Reviews[];
  categories: Categories;
};

export type ImageData = RegExpMatchArray;