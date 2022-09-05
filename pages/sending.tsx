import type { NextPage } from "next";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { dbService } from "firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Sending: NextPage = () => {
  const [state, setState] = useState<{ [x: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string | null;
    const body = data.get("body") as string | null;

    try {
      const docRef = await addDoc(collection(dbService, "consultation"), {
        title,
        body,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setState({});
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((res) => ({
      ...res,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          글 올리기
        </Typography>
        <Box
          component="form"
          width="100%"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={handleChange}
                value={state.title || ""}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                id="body"
                label="Body"
                name="body"
                multiline
                required
                fullWidth
                rows={10}
                onChange={handleChange}
                value={state.body || ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Sending;
