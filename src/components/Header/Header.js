import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import LockIcon from "@material-ui/icons/Lock";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <LibraryBooksIcon />
          <h6
            style={{
              fontWeight: 500,
              fontSize: "16px",
              letterSpacing: "0.05em",
              marginLeft: "4px",
              marginBottom: "0",
            }}
          >
            Your Courses
          </h6>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={e => history.push("/profile")}>
        <IconButton aria-controls="primary-search-account-menu" color="inherit">
          <AccountCircle />
          <h6
            style={{
              fontWeight: 500,
              fontSize: "16px",
              letterSpacing: "0.05em",
              marginLeft: "4px",
              marginBottom: "0",
            }}
          >
            Profile
          </h6>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <LockIcon />
            <h6
              style={{
                fontWeight: 500,
                fontSize: "16px",
                letterSpacing: "0.05em",
                marginLeft: "4px",
                marginBottom: "0",
              }}
            >
              Logout
            </h6>
          </Badge>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            LOGO
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <LibraryBooksIcon />
              <h6
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "0.05em",
                  marginLeft: "4px",
                  marginBottom: "0",
                }}
              >
                Your Courses
              </h6>
            </IconButton>
            <IconButton edge="end" aria-controls={menuId} color="inherit" onClick={e => history.push("/profile")}>
              <AccountCircle />
              <h6
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "0.05em",
                  marginLeft: "4px",
                  marginBottom: "0",
                }}
              >
                Profile
              </h6>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge color="secondary">
                <LockIcon />
                <h6
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    letterSpacing: "0.05em",
                    marginLeft: "4px",
                    marginBottom: "0",
                  }}
                >
                  Logout
                </h6>
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
