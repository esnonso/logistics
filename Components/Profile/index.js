import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "../Containers/container";
import axios from "axios";
import classes from "./index.module.css";
import { PTags } from "../Text";
import Button from "../Button";

export default function UserProfile(props) {
  const [user, setUser] = useState("");
  const pathName = usePathname();
  const router = useRouter();
  const [shipments, setShipments] = useState([]);

  const fetchUserHandler = async () => {
    try {
      const response = await axios.post("/api/getUser");
      setUser(response.data);
      if (pathName === "/profile") setShipments(response.data.shipments);
      if (pathName === "/profile/quotes") setShipments(response.data.quotes);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchUserHandler();
  }, []);

  const style = {
    color: "brown",
    fontSize: "large",
  };

  return (
    <Container
      margin="5rem 0 0 0"
      width="100%"
      padding="1rem"
      flex="column"
      minHeight="60vh"
    >
      <Container width="100%" justify="flex-end">
        {user.role === "Administrator" && (
          <Link href="/admin" className={classes["link"]}>
            Dashboard
          </Link>
        )}

        {pathName === "/profile" && (
          <Link href="/profile/quotes" className={classes["link"]}>
            Quotes
          </Link>
        )}

        {pathName === "/profile/quotes" && (
          <Link href="/profile" className={classes["link"]}>
            Shipments
          </Link>
        )}

        <Link href="/" onClick={() => signOut()} className={classes["link"]}>
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
        <Container
          justify="space-between"
          height="fit-content"
          align="center"
          padding="0 0.5rem"
          color="#2E1C12"
        >
          {pathName === "/profile" && (
            <>
              <PTags fontSize="20px" color="white">
                Courier Requests
              </PTags>
              <Link href="/delivery/new" className={classes["link"]}>
                +New Request
              </Link>
            </>
          )}

          {pathName === "/profile/quotes" && (
            <>
              <PTags fontSize="20px" color="white">
                Moving Requests
              </PTags>
              <Link href="/quote/new" className={classes["link"]}>
                +New Request
              </Link>
            </>
          )}
        </Container>

        {shipments.map((s) => (
          <Container
            width="100%"
            flex="column"
            // border="1px gray solid"
            padding="0.5rem"
            margin="0 0 0.8rem 0"
            color="burlywood"
            key={s.id}
          >
            <PTags margin="0 0 0.5rem 0" key={s._id}>
              <span style={style}>From : </span> {s.from}
            </PTags>
            <PTags margin="0 0 0.5rem 0">
              <span style={style}>To: </span> {s.to}
            </PTags>

            {pathName === "/profile" && s.status !== "Awaiting Payment" && (
              <PTags>
                <span style={style}>Status:</span> {s.status}
              </PTags>
            )}

            <Container justify="flex-end">
              {s.status === "Awaiting Payment" && (
                <Button
                  text="Checkout"
                  back="#2E1C12"
                  color="burlywood"
                  width="fit-content"
                  borderRadius={"5px"}
                  font="inherit"
                  padding={"0.5rem 1.5rem"}
                  click={() => router.push("/delivery/" + s._id)}
                />
              )}
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
