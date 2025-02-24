import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import styles from './index.module.css';

type Props = {
  initiaiImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initiaiImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initiaiImageUrl);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        他のにゃんこも見る!
      </button>
      <div>{loading || <img src={imageUrl} className={styles.img} />}</div>
    </div>
  );
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initiaiImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const images = await res.json();
  console.log(images);
  return images[0];
};
