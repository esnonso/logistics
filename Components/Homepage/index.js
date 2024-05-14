import { useRouter } from "next/router";
import Button from "../Button";
import Container from "../Containers/container";
import { H1Tags, PTags } from "../Text";
import classes from "./index.module.css";
import Link from "next/link";

export default function Homepage() {
  const router = useRouter();
  return (
    <Container width="100%" height="100%" flex="column">
      {/* BANNER AND FIRST SECTION */}
      <div className={classes.outer}>
        <Container height="100%" justify="center" flex="column">
          <H1Tags margin="0.5rem 0">Moving And Delivery Company</H1Tags>

          <PTags margin="0 0 1rem 0" color="white" fontSize="20px">
            6 Tiamiyu Street, Fadeyi. Lagos
          </PTags>

          <Link href="/quote/new" className={classes["home-link"]}>
            Request a quote
          </Link>
        </Container>
      </div>

      <div className={classes.quote}>
        <b>★</b>
        <br />
        Whether it's a smooth move to your new home or swift delivery of your
        precious cargo, we take pride in turning the complex into convenience.
        <br />
        <b>★</b>
      </div>

      {/* MY SERVICES SECTION */}
      <div
        style={{
          width: "100%",
          margin: "3rem 0 5rem 0",
          display: "flex",
          flexDirection: "column",
        }}
        id="our-services"
      >
        <PTags
          textAlign="center"
          fontSize="25px"
          width="100%"
          margin="0 0 1rem 0"
        >
          OUR SERVICES
        </PTags>

        <div className={classes["card-container"]}>
          <div className={classes["card"]}>
            <div className={classes["moving"]}></div>
            <Container width="100%" flex="column">
              <PTags fontWeight="600">Moving Services</PTags>
              <PTags margin="1rem 0 1rem 0" fontSize="16px">
                Moving out of your home or office? Trust us to handle your
                transition, so you can focus on what matters most- Yourself!
              </PTags>
              <Button
                text="Request a quote"
                back="burlywood"
                width="fit-content"
                height={"3rem"}
                borderRadius={"5px"}
                font="inherit"
                padding={"0.5rem 3rem"}
                click={() => router.push("/quote/new")}
              />
            </Container>
          </div>

          <div className={classes["card"]}>
            <div className={classes["delivery"]}></div>
            <Container width="100%" flex="column">
              <PTags fontWeight="600">Inter State Delivery Services</PTags>
              <PTags margin="1rem 0 1rem 0" fontSize="16px">
                Need to deliver a cargo or parcel? We offer Inter state Courier
                and Truck Delivery Services.
              </PTags>
              <Button
                text="Request pick up"
                back="burlywood"
                width="fit-content"
                height={"3rem"}
                borderRadius={"5px"}
                font="inherit"
                padding={"0.5rem 3rem"}
                click={() => router.push("/delivery/new")}
              />
            </Container>
          </div>
        </div>
      </div>
    </Container>
  );
}
