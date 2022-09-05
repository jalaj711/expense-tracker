import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import getDB, { type ProfileType } from "../database";

export default function AddNew() {
  const navigate = useNavigate();
  const id = useParams().id as string;
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [profile, setProfile] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    getDB().then((db) => {
      // TODO: Add a 404 check here
      db.get("profiles", id).then(
        (result) => result && setProfile(result.name)
      );

      db.getAll("profiles").then((result) => setProfiles(result));
    });
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log([
      data.get("title"),
      data.get("amount"),
      data.get("type"),
      data.get("description"),
      data.get("profile"),
    ]);
    const amount =
      (data.get("amount") as unknown as number) *
      (data.get("type") === "Expense" ? -1 : 1);
    getDB().then((db) => {
      db.getFromIndex(
        "profiles",
        "by-name",
        data.get("profile") as string
      ).then((prof) => {
        if (prof) {
          db.put("transactions", {
            title: data.get("title") as string,
            amount: amount,
            description: data.get("description") as string | undefined,
            profile: prof.id,
            date: new Date(),
          }).then(() => {
            prof.amount += amount;
            db.put("profiles", prof).then(() =>
              navigate("/profile/" + prof.id)
            );
          });
        }
      });
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
            id="outlined-select-amount"
            select
            label="Transaction Type"
            value={type}
            name="type"
            fullWidth
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setType(event.target.value)
            }
          >
            {["Expense", "Income"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            id="outlined-select-profile"
            select
            label="Profile"
            value={profile}
            name="profile"
            fullWidth
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setProfile(event.target.value)
            }
          >
            {profiles.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
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
