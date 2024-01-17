import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "../Containers/container";
import { PTags } from "../Text";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Login({ modal, onHide }) {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  });

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      //VALIDATE FORM
      const formInputs =
        document.forms["login-form"].getElementsByTagName("input");
      for (let input of formInputs) {
        if (input.value === "") {
          setError(`${input.name} cannot be blank!`);
          return;
        }
      }
      //SIGNIN
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) throw new Error(res.error);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className={modal ? "modal-form" : ""}
      onSubmit={submitHandler}
      name="login-form"
    >
      <Container
        flex="column"
        margin="0 0 1rem 0"
        width="100%"
        justify="center"
        align="center"
      >
        <PTags fontSize="20px" width="100%" textAlign="center">
          Login
        </PTags>

        {error && (
          <small style={{ color: "red", textAlign: "center" }}>
            Error: {error}
          </small>
        )}
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
        <label htmlFor="Password">Password *</label>
        <input
          type="password"
          value={password}
          onChange={inputChangeHandler(setPassword)}
          name="Password"
        />
      </Container>
      <Container justify="flex-start" width="100%">
        <small>
          <Link href="/register" onClick={onHide}>
            Not Registered? Click to Register
          </Link>
        </small>
      </Container>
      <Container width="100%" justify="flex-end" margin="1rem 0 1rem 0">
        <button className="btn-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Container>
    </form>
  );
}
