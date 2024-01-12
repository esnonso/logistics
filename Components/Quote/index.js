import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";

export default function RequestAQuote() {
  return (
    <form>
      <PTags fontSize="20px">Request a Quote</PTags>
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
        <label>Current Address</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>New Address</label>
        <input type="text" />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>Current Appartment Type</label>
        <select>
          <option></option>
          <option>Flat</option>
          <option>Duplex</option>
          <option>Office</option>
        </select>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label>New Appartment Type</label>
        <select>
          <option></option>
          <option>Flat</option>
          <option>Duplex</option>
          <option>Office</option>
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
