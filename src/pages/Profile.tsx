import { Box, Card, Typography, Fab } from "@mui/material";
import { useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import getDB from "../database";
import type { ProfileType, TransactionType } from "../database";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const Expense = (props: {
  title: string;
  amount: number;
  description?: string;
}) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        my: 2,
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <Typography variant="body1">{props.title}</Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {props.description}
        </Typography>
      </div>
      <span style={{ flexGrow: 1 }} />
      <div>
        <Typography variant="body1" color={props.amount > 0 ? "green" : "red"}>
          ₹<b>{props.amount}</b>
        </Typography>
      </div>
    </Card>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const profileId = useParams().id as string;
  const [profile, setProfile] = useState<ProfileType>();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    getDB().then((db) => {
      db.get("profiles", profileId).then((profile) => {
        setProfile(profile);
        db.getAllFromIndex("transactions", "by-profile", profileId).then(
          (transacs) => {
            setTransactions(transacs);
          }
        );
      });
    });
  });
  return (
    <Box my={2}>
      <Typography variant="h3">{profile?.name}</Typography>
      <Card
        variant="outlined"
        sx={{ width: "100%", my: 2, p: 4, borderRadius: 4 }}
      >
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Sun, Sep 4
        </Typography>
        <Typography variant="h3">₹ {profile?.amount}</Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Today: <b style={{ color: "red" }}>₹ -34</b>
        </Typography>
      </Card>

      <Typography variant="h6">Recent transactions</Typography>
      <div>
        {transactions.map((elem, key) => (
          <Expense
            title={elem.title}
            description={elem.description}
            amount={elem.amount}
            key={key}
          />
        ))}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <Add onClick={() => navigate("/addnew/" + profileId)} />
      </Fab>
    </Box>
  );
}
