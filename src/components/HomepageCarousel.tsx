import React from "react";
import { Link } from "react-router-dom";
// import styles from "./HomepageCarousel.module.css";
// import Carousel from "react-bootstrap/Carousel";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(45),
  [theme.breakpoints.down("md")]: {
    backgroundImage:
      "url('https://i.picsum.photos/id/1053/3596/2393.jpg?hmac=shru06Q5TiVeHArvSrQdBwclhorTJwYGnprqLqaH0hk')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  },
  [theme.breakpoints.up("md")]: {
    backgroundImage:
      "url('https://i.picsum.photos/id/1043/5184/3456.jpg?hmac=wsz2e0aFKEI0ij7mauIr2nFz2pzC8xNlgDHWHYi9qbc')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    backgroundImage:
      "url('https://i.picsum.photos/id/1036/4608/3072.jpg?hmac=Tn9CS_V7lFSMMgAI5k1M38Mdj-YEJR9dPJCyeXNpnZc')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  },
}));

const HomepageCarousel = () => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <>
      {username ? (
        <Link to="/myurls">
          <Root />
        </Link>
      ) : (
        <Link to="/register">
          <Root />
        </Link>
      )}
    </>
  );
};

export default HomepageCarousel;
