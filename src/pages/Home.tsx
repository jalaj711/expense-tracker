import { Box, Card, Typography, Fab } from "@mui/material";
import { useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

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
  const theme = useTheme();
  return (
    <Box my={2}>
      <Typography variant="h3">Dashboard</Typography>
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
        <Typography variant="h3">₹ 2716.45</Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Today: <b style={{ color: "red" }}>₹ -34</b>
        </Typography>
      </Card>

      <Typography variant="h6">Recent transactions</Typography>
      <div>
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={45}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the descriptionTesting the descriptionTesting the descriptionTesting the descriptionTesting the descriptionTesting the description"
          amount={-20}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={-45.23}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={45}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={43}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={120}
        />
        <Expense
          title="Some Random Expense"
          description="Testing the description"
          amount={180}
        />
      </div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <Add />
      </Fab>
    </Box>
  );
}
