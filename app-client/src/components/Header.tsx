import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User, clearUserData, getUserData } from "../utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Menu, MenuItem } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [user, setUser] = useState<User>();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getUserData();
    setUser(data);
  }, []);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    clearUserData();
    
    await logout();

    navigate("/login");
  };

  return (
    <AppBar position="static" style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1}}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} md={4}>
            <Typography variant="h6">TODO</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={8}
            container
            alignItems={"center"}
            justifyContent="flex-end"
          >
            <Link href="/" color="inherit" style={{ margin: "0 10px" }}>
              Task
            </Link>
            {user?.role === "admin" && (
              <Link href="/user" color="inherit" style={{ margin: "0 10px" }}>
                Users
              </Link>
            )}
            <Button
              startIcon={<ExitToAppIcon />}
              onClick={handleMenu}
              color="inherit"
              style={{ marginLeft: "10px" }}
            >
              Logout
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
