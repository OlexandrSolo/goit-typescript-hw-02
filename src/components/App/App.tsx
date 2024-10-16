import { useEffect, useState } from "react";
import styles from "./App.module.css";
import fetchImagesWithTopic from "../Service/images-api";
import Header from "../Header/Header";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import {ImageModal} from "../ImageModal/ImageModal";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { Image, ModalImage, ResponseType } from "./App.types";
import toast from "react-hot-toast";

const initialStateForModal = {
  id: "",
  alt_description: "",
  urls: {
    regular: "",
    small: "",
  },
}

function App() {
  const [imgForSearch, setImgForSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<Image>(initialStateForModal)

  useEffect(() => {
    if (imgForSearch.trim() === "") {
      return;
    }
    async function getImages(imgForSearch: string, page: number) {
      try {
        setLoading(true);
        setError(false);
        const newImages = await fetchImagesWithTopic<ResponseType>(imgForSearch, page);
        if (newImages.total_pages === 0) {
          toast.error("There is not photos matched your search. Try input another one, please")
        }
        setImages((prevState) => [...prevState, ...newImages.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages(imgForSearch, page);
  }, [imgForSearch, page]);



  const searchImg = (img: string) => setImgForSearch(img)
  const dataModal = (modalImg: Image) => setModalImg(modalImg);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (img: string) => {
    setImages([]);
    searchImg(img);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <Header submitForm={handleSubmit} />
      <div className={styles.container}>
        {loading && <Loading />}
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} dataForModal={dataModal} />
        )}
        {images.length > 0 && !loading && (
          <LoadMoreBtn handleLoad={handleLoadMore} />
        )}
        {modalIsOpen && <ImageModal
          dataForModal={modalImg}
          modalIsOpen={modalIsOpen}
          onCloseModal={closeModal}
        />}
      </div>
    </>
  );
}

export default App;
