import {ImageCard} from "../ImageCard/ImageCard";
import styles from "../ImageGallery/ImageGallery.module.css";
import { Image } from "../App/App.types";
import {FC} from "react";

interface ImageGalleryProps{
  images: Image[];
  openModal: () => void;
  dataForModal: (dataForModal: Image) => void;
}

export const ImageGallery: FC<ImageGalleryProps>=({ images, openModal, dataForModal }) => {
  return (
    <ul className={styles.parent}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard imgData={image} onOpenModal={openModal} dataForModal={dataForModal} />
        </li>
      ))}
    </ul>
  );
}
