export const API_URL = '';

export interface ImageResponseModelWithAnimation {
  item: ImageResponseModel;
  state: string;
  sizeRatio: number;
}

export interface ImageResponseModel {
  mainTitle: string;
  imagesGalleryList: [
    {
      src: string;
      alt: string;
    }
  ];
  mainImage: string;
  smallImage: string;
  objectTitle: string;
  description: string;
  mainTechnique_title: string;
  mainTechnique_content: string;
  events: [
    {
      title: string;
      header: string;
      data: string;
    }
  ];
}

export const EVENT_WHEN = '... When';
export const EVENT_WHERE = '... Where';
