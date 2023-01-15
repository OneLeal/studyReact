import React from "react";
import styles from "./index.module.css";
import { Carousel, Image } from "antd";
import img1 from "../../assets/images/carousel_1.jpg";
import img2 from "../../assets/images/carousel_2.jpg";
import img3 from "../../assets/images/carousel_3.jpg";

const imgList = [img1, img2, img3];

export const SlideShow: React.FC = () => {
  return (
    <Carousel autoplay className={styles["slide-show"]}>
      {imgList.map((src) => (
        <Image key={src} src={src} />
      ))}
    </Carousel>
  );
};
