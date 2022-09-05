import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, ProTip, Copyright } from "components";
import { authService } from "firebaseConfig";
import { signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import Router from "next/router";

const Home: NextPage = () => {
  const onLogOutClick = () => {
    signOut(authService);
    Router.push("/login");
  };
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
        <Link href="/about" color="secondary">
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
