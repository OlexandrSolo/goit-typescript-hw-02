import React from "react";
import { Image } from "../App/App.types";
import styles from "./ImageModal.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

interface ImageModalProps {
  dataForModal: Image;
  onCloseModal: () => void;
  modalIsOpen: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({ dataForModal, onCloseModal, modalIsOpen }) => {
  return (
    <>
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        aria={{
          labelledby: "photo",
          describedby: dataForModal.alt_description !== null ? dataForModal.alt_description : "There is no description"
        }}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onCloseModal}
        ariaHideApp={false}
      >

        <img className={styles.contain} src={dataForModal.urls.regular}
          alt={dataForModal.alt_description !== null ? dataForModal.alt_description : "There is no description"} />
      </Modal>
    </>

  );
}
