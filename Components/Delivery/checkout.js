import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "../Containers/container";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import { PTags } from "../Text";
import Loader from "../Loader";

export default function Checkout({ id }) {
  const router = useRouter();
  const [shipment, setShipment] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSucess] = useState(false);

  const fetchShipmentDetails = async () => {
    try {
      const response = await axios.post("/api/getShipment", {
        id: id,
      });
      setShipment(response.data.shipment);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      if (response.data.shipment.shipmentType === "Parcel") setAmount(15000);
      if (response.data.shipment.shipmentType === "Cargo Quater Truck Load")
        setAmount(50000);
      if (response.data.shipment.shipmentType === "Cargo Half Truck Load")
        setAmount(80000);
      if (response.data.shipment.shipmentType === "Cargo Full Truck Load")
        setAmount(200000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShipmentDetails();
  }, [amount]);

  const style = {
    width: "40%",
    fontWeight: 600,
  };

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    try {
      setSucess(true);
      await axios.post("/api/setShipmentPaymentStatus", {
        paymentStatus: reference.status,
        transactionRef: reference.reference,
        id,
      });
      setMessage("Transaction confirmed! An agent will contact you shortly!");
    } catch (err) {
      setError("An error occured confirming transaction");
    } finally {
      setSucess(false);
      setTimeout(() => {
        router.replace("/profile");
      }, 3000);
    }
  };

  const componentProps = {
    email,
    amount: +amount * 100,
    metadata: {
      phone,
    },
    publicKey: "pk_test_8d1c1609aa0234dad50909270ea58cca4cc39fd1",
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: () => {
      setError("Transaction closed by user!");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    },
  };

  return (
    <div className="form-div">
      {success && <Loader message="Confirming transaction" />}
      <PTags fontSize="25px">Your shipment Details</PTags>
      {error && (
        <small style={{ color: "red", textAlign: "center" }}>{error}</small>
      )}
      {message && (
        <PTags textAlign="Center" color="green">
          {message}
        </PTags>
      )}
      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Receipient Name: </span>
        {shipment.receipientName}
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Receipient Phone: </span>
        {shipment.receipientPhone}
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Pickup Address: </span>
        <span style={{ width: "60%" }}> {shipment.pickupAddress}</span>
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Delivery Address: </span>
        <span style={{ width: "60%" }}>{shipment.deliveryAddress}</span>
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Shipment Type: </span>
        {shipment.shipmentType}
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Fragile: </span>
        {shipment.fragile}
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Value: </span>₦{shipment.value}
      </Container>

      <Container margin="1rem 0 0 0" width="100%">
        <span style={style}>Amount: </span>₦{amount}
      </Container>

      {!message && !error && shipment.paymentStatus !== "success" ? (
        <Container margin="1rem 0 0 0" width="100%" justify="flex-end">
          <PaystackButton className="paystack-button" {...componentProps} />
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}
