import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import CheatSheet from "../CheatSheet";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/Themecontext";
import { useTheme } from "@mui/material/styles";

const styles = {
  appBar: {
    zIndex: 1201,
  },
  menuButton: {
    borderRadius: "10px",
    marginLeft: "10px",
    border: "1px solid grey",
    padding: "5px",
  },
  navTitle: {
    flexGrow: 1,
    marginLeft: "30px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  themeToggle: {
    marginRight: "10px",
  },
};

const Navbar = ({ onMenuButtonClick }) => {
  const [showSheet, setShowSheet] = useState(false);
  const theme = useTheme();
  const colorMode = useThemeContext();

  return (
    <AppBar position="absolute" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          sx={styles.menuButton}
          disableRipple
          edge="start"
          aria-label="sidebar menu"
          onClick={onMenuButtonClick}
        >
          <MenuIcon color="textPrimary" />
        </IconButton>
        <Box sx={styles.navTitle}>
          <Link to="/" style={styles.navTitle}>
            <Typography variant="h6" component="span">
              QueryFlow
            </Typography>
          </Link>
        </Box>
        <Tooltip title={theme.palette.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton sx={styles.themeToggle} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Cheatsheet">
          <Button color="secondary" size="small" name="sheet" onClick={() => setShowSheet(true)}>
            <BookIcon />
          </Button>
        </Tooltip>
        <CheatSheet open={showSheet} handleCloseSheet={() => setShowSheet(false)} />
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};

export default Navbar;