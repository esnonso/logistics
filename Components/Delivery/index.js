import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";

export default function RequestPickup() {
  return (
    <form>
      <PTags fontSize="20px">Request Pickup Delivery</PTags>
      <small>Fill all inputs</small>
      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Name</label>
        <input type="text" className="" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Phone Number</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Email</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Pickup Address</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Receipient Address</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Receipient State</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Value of Shipment </label>
        <input type="text" placeholder="ex Above 100,000 naira" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Service type</label>
        <select>
          <option></option>
          <option>Parcel</option>
          <option>Cargo</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Special Instruction</label>
        <select>
          <option></option>
          <option>Fragile</option>
          <option>None</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>What do we assist you with?</label>
        <select>
          <option></option>
          <option>Full Moving Service</option>
          <option>Truck</option>
          <option>Packing and unpacking</option>
          <option>Cleaning and fixing of appliances</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Item description</label>
        <textarea type="text" placeholder="2 bags of cement" />
      </Container>
      <Container width="100%" justify="flex-end" margin="0 0 1rem 0">
        <Button
          text="Submit"
          back="burlywood"
          width="fit-content"
          height={"3rem"}
          borderRadius={"5px"}
          font="inherit"
          padding={"0.5rem 3rem"}
        />
      </Container>
    </form>
  );
}
