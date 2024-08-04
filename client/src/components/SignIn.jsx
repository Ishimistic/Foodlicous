import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

function SignIn({ setOpenAuth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all details");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        const { user, token } = res.data; // Adjust according to your API response structure
        console.log("Name of user: ", user);

        dispatch(loginSuccess({ user, token }));
        dispatch(
          openSnackbar({
            message: "Login Successful",
            severity: "success",
          })
        );
        setLoading(false);
        setButtonDisabled(false);
        setOpenAuth(false);

        // Navigate to home with user ID
        navigate(`/home/${user.id}`); // Adjust route path and user ID field as needed
      } catch (err) {
        setLoading(false);
        setButtonDisabled(false);

        const errorMessage = err.response?.data?.message || err.message || "An error occurred. Please try again.";

        dispatch(
          openSnackbar({
            message: errorMessage,
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Foodlicous</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password here"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handleSignIn}
          loading={loading}
          isdisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
}

export default SignIn;
