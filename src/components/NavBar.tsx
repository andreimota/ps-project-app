import * as React from "react";
import {useEffect, useState} from "react";


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import useAuth, {AccountType, JwtKeys} from "../router/useAuth";

interface Page {
  label: string,
  route: string
}

const donorPages: Page[] = [

];



const NavBar = () => {
  const [loggedUser, setLoggedUser] = useState<JwtKeys | undefined>(undefined);

  window.addEventListener("storage", () => {
    const loggedUser = useAuth();

    if(loggedUser) setLoggedUser(loggedUser);
  });

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [pages, setPages] = React.useState<any>([]);

  useEffect(() => {
    const user = useAuth();
    setLoggedUser(user);
  }, []);

  useEffect(() => {
    switch(parseInt( loggedUser?.accountType || "" )) {
    case AccountType.DONOR:
      setPages(donorPages);
      break;
    case undefined:
      setPages([]);
      break;
    }
  }, [loggedUser]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");

    setLoggedUser(undefined);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                backgroundColor: "primary",
              }}
            >
              {pages.map((page: Page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"
                    component="a"
                    href={`/${page}`}
                    sx={{
                      display: { md: "flex" },
                      color: "inherit",
                      textDecoration: "none",
                    }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: any) => (
              <Typography
                key={page.label}
                component="a"
                href={page.route}
                sx={{
                  ml: 4,
                  display: { xs: "flex" },
                  textDecoration: "none",
                }}
              >
                {page.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", flex: "inline" }}>
            {loggedUser && <>
              <Typography textAlign="center"
                component="a"
                href={"/login"}
                onClick={handleLogOut}
                sx={{
                  marginRight: "0.6rem",
                  marginTop: "0.5rem",
                  display: { md: "flex" },
                  color: "white !important",
                  textDecoration: "none",
                }}>LOG OUT</Typography>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Andrei Mota" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;