import { useState, useEffect } from "react";
import Container from "../Containers/container";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { PTags } from "../Text";
import { allState } from "../Objects/states";
import Button from "../Button";
import axios from "axios";

export default function RequestPickup() {
  const { status } = useSession();
  const router = useRouter();
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [pState, setPState] = useState("");
  const [pStateLgas, setPStateLgas] = useState([]);
  const [pLga, setPLga] = useState("");
  const [dState, setDState] = useState("");
  const [dStateLgas, setDStateLgas] = useState([]);
  const [dLga, setDLga] = useState("");
  const [type, setType] = useState("");
  const [fragile, setFragile] = useState("");
  const [desc, setDesc] = useState("");
  const [cargoSize, setCargoSize] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const pickUpStateChangeHandler = (e) => {
    setPState(e.target.value);
    for (let state of allState) {
      if (state.state === e.target.value) {
        setPStateLgas(state.lgas);
      }
    }
  };

  const deliveryStateChangeHandler = (e) => {
    setDState(e.target.value);
    for (let state of allState) {
      if (state.state === e.target.value) {
        setDStateLgas(state.lgas);
      }
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsSubmitting(true);
      const formInputs =
        document.forms["delivery-form"].getElementsByTagName("input");
      const formSelect =
        document.forms["delivery-form"].getElementsByTagName("select");

      for (let input of formInputs) {
        if (
          input.value === "" &&
          input.name !== "Description" &&
          input.name !== "Value of Shipment"
        ) {
          setError(`${input.name} cannot be blank!`);
          setIsSubmitting(false);
          return;
        }
      }

      for (let input of formSelect) {
        if (input.value === "" && input.name !== "Cargo Type") {
          setError(`${input.name} cannot be blank!`);
          setIsSubmitting(false);
          return;
        }
      }

      if (type === "Cargo" && cargoSize === "") {
        setError("Cargo size cannot be blank");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("/api/courier", {
        name,
        phone,
        pickupAddress: `${pickupAddress}, ${pLga} L.G.A. ${pState}`,
        deliveryAddress: `${deliveryAddress}, ${dLga} L.G.A. ${dState}`,
        fragile,
        value,
        type: type === "Parcel" ? type : `${type} ${cargoSize}`,
        desc,
      });
      router.push("/delivery/" + response.data);
    } catch (error) {
      setError("An error occured, try again");
      setIsSubmitting(false);
    }
  };

  return (
    <form name="delivery-form" onSubmit={submitHandler}>
      <Container flex="column" margin="0 0 1rem 0">
        <PTags fontSize="20px">Request Pickup Delivery</PTags>
        {error && (
          <small style={{ color: "red", textAlign: "center" }}>{error}</small>
        )}
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Receipient Name *</label>
        <input
          type="text"
          name="Receipient Name"
          value={name}
          onChange={inputChangeHandler(setName)}
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Receipient Phone *</label>
        <input
          type="number"
          name="Receipient Phone"
          value={phone}
          onChange={inputChangeHandler(setPhone)}
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Pickup Address *</label>
        <input
          type="text"
          name="Pickup Address"
          value={pickupAddress}
          onChange={inputChangeHandler(setPickupAddress)}
        />
      </Container>

      <Container width="100%" margin="0 0 1rem 0">
        <Container width="50%" flex="column" margin="0 0.2rem 0 0">
          <label>Pickup State *</label>
          <select
            name="Pickup State"
            value={pState}
            onChange={pickUpStateChangeHandler}
          >
            <option></option>
            {allState.map((a, i) => (
              <option key={`${i}ps`}>{a.state}</option>
            ))}
          </select>
        </Container>
        <Container width="50%" flex="column">
          <label>Pickup LGA *</label>
          <select
            name="Pickup L.G.A"
            value={pLga}
            onChange={inputChangeHandler(setPLga)}
          >
            <option></option>
            {pStateLgas.map((lga, i) => (
              <option key={`${i}pl`}>{lga}</option>
            ))}
          </select>
        </Container>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Delivery Address *</label>
        <input
          type="text"
          name="Delivery Address"
          value={deliveryAddress}
          onChange={inputChangeHandler(setDeliveryAddress)}
        />
      </Container>

      <Container width="100%" margin="0 0 1rem 0">
        <Container width="50%" flex="column" margin="0 0.2rem 0 0">
          <label>Delivery State *</label>
          <select
            name="Delivery State"
            value={dState}
            onChange={deliveryStateChangeHandler}
          >
            <option></option>
            {allState.map((a, i) => (
              <option key={`${i}ds`}>{a.state}</option>
            ))}
          </select>
        </Container>
        <Container width="50%" flex="column">
          <label>Delivery LGA *</label>
          <select
            name="Delivery L.G.A"
            value={dLga}
            onChange={inputChangeHandler(setDLga)}
          >
            <option></option>
            {dStateLgas.map((lga, i) => (
              <option key={`${i}dl`}>{lga}</option>
            ))}
          </select>
        </Container>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Shipment type *</label>
        <select
          name="Type of Shipment"
          value={type}
          onChange={inputChangeHandler(setType)}
        >
          <option></option>
          <option>Parcel</option>
          <option>Cargo</option>
        </select>
      </Container>

      {type === "Cargo" && (
        <Container width="100%" flex="column" margin="0 0 1rem 0">
          <label>Cargo Size *</label>
          <select
            name="Cargo size"
            value={cargoSize}
            onChange={inputChangeHandler(setCargoSize)}
          >
            <option></option>
            <option>Quater Truck Load</option>
            <option>Half Truck Load</option>
            <option>Full Truck Load</option>
          </select>
        </Container>
      )}

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Fragile *</label>
        <select
          name="Fragile"
          value={fragile}
          onChange={inputChangeHandler(setFragile)}
        >
          <option></option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Estimated Value of Shipment </label>
        <input
          type="text"
          name="Value of Shipment"
          value={value}
          onChange={inputChangeHandler(setValue)}
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Item description</label>
        <textarea
          type="text"
          name="Description"
          value={desc}
          onChange={inputChangeHandler(setDesc)}
        />
      </Container>
      <Container width="100%" justify="flex-end" margin="0 0 1rem 0">
        <button className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Container>
    </form>
  );
}
