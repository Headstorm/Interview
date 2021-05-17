import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

function NavBar(props) {
  return (
    <AppBar position="static" width="100%">
      <Toolbar>{props.children}</Toolbar>
    </AppBar>
  );
}

export default NavBar;
