import { Box, Grid, InputBase } from "@material-ui/core";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from "react-router";
import { RouteNames } from "../../Configs";
import { useStyles } from "./styles";

const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [keyword, setKeyword] = React.useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setKeyword(event.target.value);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      history.push(`${RouteNames.search}/${keyword}`);
      setKeyword("");
    }
  };

  return (
    <Box component={"div"} className={classes.search}>
      <Grid container>
        <Grid item xs={1}>
          <div className={classes.searchIcon}>
            <BiSearchAlt size={20} />
          </div>
        </Grid>
        <Grid item xs={11}>
          <InputBase
            fullWidth
            value={keyword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
