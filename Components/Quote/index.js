import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Container from "../Containers/container";
import { allState } from "../Objects/states";
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
  const [fState, setFState] = useState("");
  const [fStateLgas, setFStateLgas] = useState([]);
  const [fLga, setFLga] = useState("");
  const [tState, setTState] = useState("");
  const [tStateLgas, setTStateLgas] = useState([]);
  const [tLga, setTLga] = useState("");
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

  const addressFromStateChangeHandler = (e) => {
    setFState(e.target.value);
    for (let state of allState) {
      if (state.state === e.target.value) {
        setFStateLgas(state.lgas);
      }
    }
  };

  const addressToStateChangeHandler = (e) => {
    setTState(e.target.value);
    for (let state of allState) {
      if (state.state === e.target.value) {
        setTStateLgas(state.lgas);
      }
    }
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
        movingFrom: `${movingFrom}, ${fLga} L.G.A. ${fState}.`,
        movingTo: `${movingTo}, ${tLga} L.G.A. ${tState}.`,
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
          readOnly={status === "authenticated"}
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
          readOnly={status === "authenticated"}
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Email *</label>
        <input
          type="text"
          value={email}
          onChange={inputChangeHandler(setEmail)}
          name="Email"
          readOnly={status === "authenticated"}
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

      <Container width="100%" margin="0 0 1rem 0">
        <Container width="50%" flex="column" margin="0 0.2rem 0 0">
          <label>Current State *</label>
          <select
            name="Pickup State"
            value={fState}
            onChange={addressFromStateChangeHandler}
          >
            <option></option>
            {allState.map((a, i) => (
              <option key={`${i}ps`}>{a.state}</option>
            ))}
          </select>
        </Container>
        <Container width="50%" flex="column">
          <label>Current LGA *</label>
          <select
            name="Pickup L.G.A"
            value={fLga}
            onChange={inputChangeHandler(setFLga)}
          >
            <option></option>
            {fStateLgas.map((lga, i) => (
              <option key={`${i}pl`}>{lga}</option>
            ))}
          </select>
        </Container>
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

      <Container width="100%" margin="0 0 1rem 0">
        <Container width="50%" flex="column" margin="0 0.2rem 0 0">
          <label>New State *</label>
          <select
            name="Delivery State"
            value={tState}
            onChange={addressToStateChangeHandler}
          >
            <option></option>
            {allState.map((a, i) => (
              <option key={`${i}ds`}>{a.state}</option>
            ))}
          </select>
        </Container>
        <Container width="50%" flex="column">
          <label>New LGA *</label>
          <select
            name="Delivery L.G.A"
            value={tLga}
            onChange={inputChangeHandler(setTLga)}
          >
            <option></option>
            {tStateLgas.map((lga, i) => (
              <option key={`${i}dl`}>{lga}</option>
            ))}
          </select>
        </Container>
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
        <label>What do We Assist You With? *</label>
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
