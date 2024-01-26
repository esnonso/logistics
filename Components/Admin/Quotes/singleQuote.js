import { useState, useEffect } from "react";
import Container from "@/Components/Containers/container";
import { PTags } from "@/Components/Text";

export default function SingleQuote() {
  const [quote, setQuote] = useState("");
  return (
    <Container width="100%" margin="5rem 0 0 0" padding="1rem">
      <PTags>Single Quote Page</PTags>
    </Container>
  );
}
