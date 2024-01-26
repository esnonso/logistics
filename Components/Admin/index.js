import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";
import axios from "axios";

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);

  const fetchQuotesHandler = async () => {
    try {
      const userRes = await axios.get("api/getUser");
      if (userRes.data.role !== "Administrator") router.replace("/");
      const response = await axios.get("/api/getAllQuotes");
      setQuotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotesHandler();
  }, []);

  const style = {
    color: "brown",
    width: "5%",
  };
  return (
    <Container width="100%" margin="5rem 0 0 0" padding="1rem" flex="column">
      <Container width="100%" justify="flex-end">
        <Button
          text="Courier Requests"
          back="#2E1C12"
          color="burlywood"
          width="fit-content"
          borderRadius={"5px"}
          font="inherit"
          padding={"0.5rem 1.5rem"}
          margin="0 1rem 0 0"
        />

        <Button
          text="Users"
          back="#2E1C12"
          color="burlywood"
          width="fit-content"
          borderRadius={"5px"}
          font="inherit"
          padding={"0.5rem 1.5rem"}
          margin="0 1rem 0 0"
        />
      </Container>

      <Container width="100%" flex="column" margin="1rem 0 0 0">
        <PTags fontSize="20px">Moving Quote Requests</PTags>

        {quotes.map((q) => (
          <Container
            width="100%"
            flex="column"
            // border="1px gray solid"
            padding="0.5rem"
            margin="0 0 0.8rem 0"
            color="burlywood"
            key={q._id}
          >
            <Container
              margin="0 0 0.5rem 0"
              width="100%"
              align="center"
              height="fit-content"
            >
              <span style={style}>From : </span> {q.movingFrom}
            </Container>
            <Container
              margin="0 0 0.5rem 0"
              width="100%"
              align="center"
              height="fit-content"
            >
              <span style={style}>To: </span> {q.movingTo}
            </Container>
            <Container margin="0 0 0.5rem 0" width="100%" align="center">
              <span style={style}>Status: </span>{" "}
              {!q.amount ? "Unattended" : "Attended"}
            </Container>
            <small>Created {new Date(q.createdAt).toUTCString()}</small>

            <Container justify="flex-end">
              <Button
                text="View"
                back="#2E1C12"
                color="burlywood"
                width="fit-content"
                borderRadius={"5px"}
                font="inherit"
                padding={"0.3rem 1rem"}
                click={() => router.push("/admin/quotes/" + q._id)}
              />
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
