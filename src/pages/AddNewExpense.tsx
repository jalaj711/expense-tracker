import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Add } from "@mui/icons-material";

export default function AddNew() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={
        {
          // height: "100vh",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          py: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Add a transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            variant="outlined"
          />
          <TextField
            type="number"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            variant="outlined"
          />
          <TextField
            margin="normal"
            id="outlined-select-currency"
            select
            label="Transaction Type"
            value={"Expense"}
            fullWidth
            //   onChange={handleChange}
          >
            {["Expense", "Income"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            variant="outlined"
            multiline
            minRows={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
