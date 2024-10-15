import { useEffect, useState } from "react";
import styles from "./App.module.css";
import fetchImagesWithTopic from "../Service/images-api";
import Header from "../Header/Header";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

interface Image {
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  }
}

interface ModalImage{
  src: string;
  alt: string
}

function App() {
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(999);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<ModalImage>({ src: "", alt: "" });

  useEffect(() => {
    if (value.trim() === "") {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const newImages: Image = await fetchImagesWithTopic(value, page);
        setImages((prevState) => [...prevState, ...newImages.data.results]);
        setTotalPage(newImages.data.total_pages);
        setShowBtn(totalPage && totalPage !== page);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [value, page]);

  const handleSubmit = (value:string) => {
    setImages([]);
    setValue(value);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleClickImg = ({ src, alt }) => {
    setModalImg({ alt: alt, src: src });
    setIsOpen(true);
  };

  return (
    <>
      <Header submitForm={handleSubmit} />
      <div className={styles.container}>
        {loading && <Loading />}
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={handleClickImg} />
        )}
        {images.length > 0 && !loading && showBtn && (
          <LoadMoreBtn handleLoad={handleLoadMore} />
        )}

        <ImageModal
          src={modalImg.src}
          alt={modalImg.alt}
          isOpen={modalIsOpen}
          onClose={setIsOpen}
        />
      </div>
    </>
  );
}

export default App;
