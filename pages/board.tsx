import { useEffect, useState, useCallback, useMemo } from "react";
import type { NextPage } from "next";
import { Container, Box, Typography, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BOARD } from "types";
import {
  query,
  orderBy,
  startAfter,
  collection,
  getDocs,
  DocumentData,
  limit,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { dbService } from "firebaseConfig";
import _ from "lodash";

const columns: GridColDef[] = [
  { field: "uid", headerName: "uid", width: 80 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "createdAt", headerName: "Created", width: 130 },
];

interface SnapshotData extends BOARD {
  id: string;
}

const BoardList: NextPage = () => {
  const [boards, setBoards] = useState<BOARD[]>([]);
  const [viewNum, setViewNum] = useState<number>(25);

  useEffect(() => {
    (async () => {
      // Query the first page of docs
      const first = query(
        collection(dbService, "consultation"),
        orderBy("createdAt"),
        limit(25)
      );
      const documentSnapshots = await getDocs(first);

      // Get the last visible document
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      // console.log(documentSnapshots.docs.length);

      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(
        collection(dbService, "consultation"),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(25)
      );

      const querySnapshot = await getDocs(next);
      querySnapshot.forEach((doc) => {
        const boardObj: SnapshotData = {
          ...doc.data(),
          id: doc.id,
        } as SnapshotData;

        // console.log(boardObj);
      });
    })();

    return () => {};
  }, []);

  const getBoards = useCallback(async () => {
    const q = query(collection(dbService, "consultation"));
    const querySnapshot = await getDocs(q);
    onSnapshot(q, {
      next: (doc) => {
        doc.forEach((doc) => {
          const boardObj: SnapshotData = {
            ...doc.data(),
            id: doc.id,
          } as SnapshotData;
          setBoards((prev) => _.uniqBy([boardObj, ...prev], ({ uid }) => uid));
        });
      },
    });
    // querySnapshot.forEach((doc) => {
    //   const boardObj: SnapshotData = {
    //     ...doc.data(),
    //     id: doc.id,
    //   } as SnapshotData;
    //   setBoards((prev) => [boardObj, ...prev]);
    // });
  }, []);

  useEffect(() => {
    getBoards();
  }, []);

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
          글 목록 조회
        </Typography>
        <Box width="100%" sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ height: "600px" }}>
            <Grid item xs={12} lg={12}>
              <DataGrid
                // getRowId={(row) => row.uid}
                rows={boards}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default BoardList;
