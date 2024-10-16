export interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
}

export interface ModalImage {
  src: string;
  alt: string;
}

export interface ResponseType {
  total: number;
  total_pages: number;
  results: Image[];
}
