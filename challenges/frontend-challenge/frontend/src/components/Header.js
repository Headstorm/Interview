import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const { title, variant, position, ...other } = props;
  return (
    <>
      <Typography
        variant={variant || "h4"}
        align={position || "center"}
        {...other}
        className={classes.title}
      >
        {title}
      </Typography>
    </>
  );
}

export default Header;
