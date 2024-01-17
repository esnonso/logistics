import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../Containers/container";
import axios from "axios";
import classes from "./index.module.css";
import { PTags } from "../Text";
import Button from "../Button";

export default function UserProfile(props) {
  const [user, setUser] = useState("");
  const [shipments, setShipments] = useState([]);
  const fetchUserHandler = async () => {
    try {
      const response = await axios.post("/api/getUserAndShipments");
      setShipments(response.data.shipments);
      setUser(response.data.user);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserHandler();
  }, []);

  return (
    <Container
      margin="5rem 0 0 0"
      width="100%"
      padding="1rem"
      flex="column"
      minHeight="60vh"
    >
      <Container width="100%" justify="flex-end">
        <Link href="/" onClick={() => signOut()} className={classes["logout"]}>
          Logout
        </Link>
      </Container>

      <Container margin="1rem 0 0 0">
        <Container flex="column">
          <PTags>Name: {user.name}</PTags>
          <PTags>Email: {user.email}</PTags>
          <PTags>Joined: {user.createdAt}</PTags>
        </Container>
      </Container>

      <Container width="100%" flex="column" margin="1rem 0 0 0">
        <PTags fontSize="20px">Your Shipments</PTags>

        {shipments.map((s) => (
          <Container
            width="100%"
            flex="column"
            border="1px gray solid"
            padding="0.5rem"
            margin="0 0 0.8rem 0"
            radius="6px"
            key={s._id}
          >
            <PTags key={s._id}>{`From: ${s.pickupAddress}`}</PTags>
            <PTags>{`To: ${s.deliveryAddress}`}</PTags>

            {s.paymentStatus && (
              <PTags>Delivery Status: {s.deliveryStatus} </PTags>
            )}

            {!s.paymentStatus && (
              <Button
                text="Proceed to Checkout"
                back="burlywood"
                width="fit-content"
                borderRadius={"5px"}
                font="inherit"
                padding={"0.5rem 1.5rem"}
                click={() => router.push("/delivery/" + s._id)}
              />
            )}
          </Container>
        ))}
      </Container>
    </Container>
  );
}
