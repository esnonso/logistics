import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Container from "../Containers/container";
import { PTags } from "../Text";
import Modal from "../Modal";
import axios from "axios";

export default function RequestAQuote() {
  const router = useRouter();
  const { status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");
  const [apptFromType, setApptFromType] = useState("");
  const [apptToType, setApptToType] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/getUser");
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      if (response.data.address) setMovingFrom(response.data.address);
    } catch (err) {
      setError("An error occured Loading this page");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserDetails();
    }
  }, [status]);

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const closeSuccessMessageHandler = () => {
    router.push("/");
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      const formInputs =
        document.forms["quote-form"].getElementsByTagName("input");
      for (let input of formInputs) {
        if (input.value === "") {
          setError(`${input.name} cannot be blank!`);
          return;
        }
      }
      await axios.post("/api/quote", {
        name,
        email,
        phone,
        apptFromType,
        apptToType,
        movingFrom,
        movingTo,
        service,
      });
      setSuccess(true);
    } catch (error) {
      setError("An error occured! Try again");
      setIsSubmitting(false);
    }
  };
  return (
    <form name="quote-form" onSubmit={submitHandler}>
      {success && (
        <Modal click={closeSuccessMessageHandler}>
          <PTags>Success! An agent will communicate with you shortly!</PTags>
        </Modal>
      )}
      <Container
        flex="column"
        margin="0 0 1rem 0"
        width="100%"
        justify="center"
        align="center"
      >
        <PTags fontSize="20px" width="100%" textAlign="center">
          Request A Quote
        </PTags>

        {error && (
          <small style={{ color: "red", textAlign: "center" }}>
            Error: {error}
          </small>
        )}
      </Container>
      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          value={name}
          onChange={inputChangeHandler(setName)}
          name="Name"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="name">Phone Number *</label>
        <input
          type="text"
          value={phone}
          htmlFor={phone}
          onChange={inputChangeHandler(setPhone)}
          name="Phone number"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Email *</label>
        <input
          type="text"
          value={email}
          onChange={inputChangeHandler(setEmail)}
          name="Email"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Current Address *</label>
        <input
          type="text"
          value={movingTo}
          onChange={inputChangeHandler(setMovingTo)}
          name="Moving from address"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>New Address *</label>
        <input
          type="text"
          value={movingFrom}
          onChange={inputChangeHandler(setMovingFrom)}
          name="Moving To address"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Current Appartment Type *</label>
        <select
          value={apptFromType}
          onChange={inputChangeHandler(setApptFromType)}
          name="Current appartment type"
        >
          <option></option>
          <option>Flat</option>
          <option>Duplex</option>
          <option>Office</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>New Appartment Type *</label>
        <select
          value={apptToType}
          onChange={inputChangeHandler(setApptToType)}
          name="New appartment type"
        >
          <option></option>
          <option>Flat</option>
          <option>Duplex</option>
          <option>Office</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>What do we assist you with? *</label>
        <select
          value={service}
          onChange={inputChangeHandler(setService)}
          name="service"
        >
          <option></option>
          <option>Full Moving Service</option>
          <option>Truck</option>
          <option>Packing and unpacking</option>
          <option>Cleaning and fixing of appliances</option>
        </select>
      </Container>
      <Container width="100%" justify="flex-end" margin="0 0 1rem 0">
        <button className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Container>
    </form>
  );
}
