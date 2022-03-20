export const API_URL = "http://127.0.0.1:8080";

export interface ImageResponseModel{
  mainTitle: string;
  imagesGalleryList: [{
      src: string;
      alt: string;
  }];
  mainImage: string;
  objectTitle: string;
  description: string;
  mainTechnique_title: string;
  mainTechnique_content: string;
  events:[{
    title: string;
    header: string;
    data: string;
  }]
}

export const EVENT_WHEN = "... When";
export const EVENT_WHERE = "... Where";