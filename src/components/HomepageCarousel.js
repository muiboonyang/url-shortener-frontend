import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomepageCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";

import { useSelector } from "react-redux";

const HomepageCarousel = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <>
      {username ? (
        <Link to="/myurls">
          <Carousel
            className={styles.carousel}
            indicators={false}
            controls={false}
            pause={false}
          >
            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q"
                alt="carousel-1"
              />
            </Carousel.Item>

            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.picsum.photos/id/1041/5184/2916.jpg?hmac=TW_9o6HeD7H7I7NVo-S1Fa1iAvzQ10uvmJqsXvNoi0M"
                alt="carousel-2"
              />
            </Carousel.Item>
          </Carousel>
        </Link>
      ) : (
        <Link to="/register">
          <Carousel
            className={styles.carousel}
            indicators={false}
            controls={false}
            pause={false}
          >
            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q"
                alt="carousel-1"
              />
            </Carousel.Item>

            <Carousel.Item interval={5000} className={styles.fillscreen}>
              <img
                className="d-block w-100"
                src="https://i.picsum.photos/id/1041/5184/2916.jpg?hmac=TW_9o6HeD7H7I7NVo-S1Fa1iAvzQ10uvmJqsXvNoi0M"
                alt="carousel-2"
              />
            </Carousel.Item>
          </Carousel>
        </Link>
      )}
    </>
  );
};

export default HomepageCarousel;
