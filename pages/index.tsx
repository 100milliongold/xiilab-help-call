import type { NextPage } from "next";
import { useCallback } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, ProTip, Copyright } from "components";
import { authService } from "firebaseConfig";
import { signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "reducers";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const onLogOutClick = useCallback(() => {
    signOut(authService);
    Router.push("/login");
    dispatch(clearUser());
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/board" color="secondary">
          Go to the about page
        </Link>
        <Button onClick={onLogOutClick}>Log Out</Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
