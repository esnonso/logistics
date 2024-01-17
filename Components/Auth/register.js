import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Container from "../Containers/container";
import { PTags } from "../Text";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [sucess, setSuccess] = useState("");
  const [pwdMatches, setPwdMatch] = useState(false);

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  });

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPwd) {
        setError("Passwords do not match");
        return;
      }
      setIsSubmitting(true);
      setError("");
      const formInputs =
        document.forms["register-form"].getElementsByTagName("input");
      for (let input of formInputs) {
        if (input.value === "") {
          setError(`${input.name} cannot be blank!`);
          return;
        }
      }
      const response = await axios.post("/api/register", {
        firstname,
        lastname,
        email,
        password,
        phone,
      });
      setSuccess(response.data);
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occured");
    } finally {
      setIsSubmitting(false);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPwd("");
    }
  };

  return (
    <form onSubmit={submitHandler} name="register-form">
      <Container
        flex="column"
        margin="0 0 1rem 0"
        width="100%"
        justify="center"
        align="center"
      >
        <PTags fontSize="20px" width="100%" textAlign="center">
          Register
        </PTags>

        {error && (
          <small style={{ color: "red", textAlign: "center" }}>
            Error: {error}
          </small>
        )}

        {sucess && (
          <small style={{ color: "green", textAlign: "center" }}>
            {sucess}
          </small>
        )}
      </Container>

      <Container width="100%" margin="0 0 1rem 0">
        <Container width="50%" flex="column" margin="0 0.2rem 0 0">
          <label htmlFor="First name">First Name *</label>
          <input
            type="text"
            value={firstname}
            onChange={inputChangeHandler(setFirstname)}
            name="First Name"
          />
        </Container>
        <Container width="50%" flex="column">
          <label htmlFor="Last name">Last Name *</label>
          <input
            type="text"
            value={lastname}
            onChange={inputChangeHandler(setLastname)}
            name="Last Name"
          />
        </Container>
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="Email">Email *</label>
        <input
          type="text"
          value={email}
          onChange={inputChangeHandler(setEmail)}
          name="Email"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="Email">Phone Number *</label>
        <input
          type="number"
          value={phone}
          onChange={inputChangeHandler(setPhone)}
          name="Phone"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="Password">Password *</label>
        <input
          type="password"
          value={password}
          onChange={inputChangeHandler(setPassword)}
          name="Password"
        />
      </Container>

      <Container width="100%" flex="column" margin="0 0 1rem 0">
        <label htmlFor="Confirm Password">Confirm Password *</label>
        <input
          type="password"
          value={confirmPwd}
          onChange={inputChangeHandler(setConfirmPwd)}
          onBlur={() => setPwdMatch(true)}
          name="Password"
        />
        {pwdMatches && password !== confirmPwd && (
          <small style={{ color: "red" }}>Passwords do not match</small>
        )}
      </Container>

      <Container width="100%" justify="flex-end" margin="0 0 1rem 0">
        <button className="btn-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Container>
    </form>
  );
}
