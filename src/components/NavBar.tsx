import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import getDB from "../database";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const AddNewProfileModal = (props: {
  open: boolean;
  handleClose: () => any;
}) => {

  const [error, setError] = React.useState('')
  const [value, setValue] = React.useState('')

  const handleAddProfile = () => {
    const profile = value;
    setError("")
    getDB().then(db => {
      db.get("profiles", profile).then(_res => {
        if(typeof _res !== 'undefined'){
          setError("This profile name is already in use.")
        } else {
          db.put("profiles", 0, profile).then(res => {
            setValue('')
            setError('')
            props.handleClose()
            // TODO: redirect to the page for that profile
          }).catch(error => {
            setError(error)
          })
        }
      }).catch(error => {
        setError(error)
      })
    }).catch(error => {
      setError("Failed to open the database")
    })
  }
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: { xs: "80%", sm: "70%", md: "50%" },
          p: 2,
          borderRadius: 2
        }}
      >
        <CardContent>
          <Typography variant="h4">Add a new profile</Typography>
          <TextField
            type="text"
            margin="normal"
            required
            fullWidth
            label="Enter the name of the new profile"
            name="name"
            variant="outlined"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            error={error !== ''}
            helperText={error}
          />
        </CardContent>
        <CardActions >
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProfile}>Add</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Expense Tracker
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <div
          style={{ display: "flex", margin: "16px 0", alignItems: "center" }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profiles
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => setModalOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </div>
        <List>
          {["Default Profile", "Profile 1", "Profile 2"].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <AddNewProfileModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
