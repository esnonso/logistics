import Image from "next/image";
import Container from "../Containers/container";
import Button from "../Button";
import Instagram from "../Media/insta.png";
import LinkedIn from "../Media/linked.png";
import Twitter from "../Media/twitter.png";
import classes from "./index.module.css";
import { H1Tags } from "../Text";

export default function Footer() {
  return (
    <Container
      width="100%"
      color="#2E1C12"
      flex="column"
      padding="2rem 1rem"
      align="center"
      justify="center"
    >
      <Container width="100%" margin="0 0 1rem 0" justify="center">
        <H1Tags color="burlywood">CountryMovers</H1Tags>
      </Container>
      <Container>
        <Image
          src={Twitter}
          alt="twitter-logo"
          width={25}
          height={25}
          className={classes.social}
        />
        <Image
          src={Instagram}
          alt="insta-logo"
          width={25}
          height={25}
          className={classes.social}
        />
        <Image
          src={LinkedIn}
          alt="linkedIn-logo"
          width={25}
          height={25}
          className={classes.social}
        />
      </Container>
      <small style={{ color: "burlywood" }}>
        countrymovers 2024. All rights reserved
      </small>
    </Container>
  );
}
