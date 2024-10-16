import styles from "./ImageCard.module.css";
import { Image } from "../App/App.types";
import { FC } from "react";

interface ImageCardProps {
  imgData: Image;
  onOpenModal: () => void;
  dataForModal: (dataForModal: Image) => void;
}

export const ImageCard: FC<ImageCardProps> = ({ imgData, onOpenModal, dataForModal }) => {
  const openModal = (imgData: Image) => {
    dataForModal(imgData);
    onOpenModal()
  }
  return (
    <div
      className={styles.container}
    >
      <img src={imgData.urls.small}
        alt={imgData.alt_description !== null ? imgData.alt_description : "There is no description"

        }
        onClick={() => openModal(imgData)}
      />
    </div>
  );
};
