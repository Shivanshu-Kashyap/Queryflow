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
import zIndex from "@mui/material/styles/zIndex";
import { useState } from "react";
import CheatSheet from "../CheatSheet";
import { Link } from "react-router-dom";

// Navbar styles
const styles = {
  appBar: {
    zIndex: zIndex.drawer + 1,
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
    textDecoration: "none", // Ensures the text is not underlined
    color: "inherit", // Inherits text color from theme
  },
};

const Navbar = ({ onMenuButtonClick }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleCloseSheet = () => {
    setShowSheet(false);
  };

  const handleOpenSheet = () => {
    setShowSheet(true);
  };

  return (
    <AppBar position="absolute" sx={{ ...styles.appBar }}>
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
        <Tooltip title="Cheatsheet">
          <Button
            color="secondary"
            size="small"
            name="sheet"
            onClick={handleOpenSheet}
          >
            <BookIcon />
          </Button>
        </Tooltip>
        <CheatSheet open={showSheet} handleCloseSheet={handleCloseSheet} />
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};

export default Navbar;
