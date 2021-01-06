import React, { Component } from "react";
import { Box, Container, Typography, withStyles } from "@material-ui/core";
import { searchKeyword } from "../../APIs";
import { SearchResultCard, SearchResultSkeleton } from "../../Components";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { IUserSearchResult, ISubSearchResult } from "../../Types";
import { GiEmptyHourglass } from "react-icons/gi";
import { styles, IClass } from "./styles";
import { SMOKEY_WHITE } from "../../Common/colors";

interface IProps {
  match: {
    params: {
      id: string;
    };
  };
  history: {
    push: Function;
  };
}

interface IState {
  users: Array<IUserSearchResult>;
  subs: Array<ISubSearchResult>;
  loading: boolean;
  keyword: string;
}

class SearchResult extends Component<IProps & IClass, IState> {
  static fetchData: any;
  constructor(props: IProps & IClass) {
    super(props);

    this.state = {
      users: [],
      subs: [],
      loading: true,
      keyword: props.match.params.id
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  static getDerivedStateFromProps(props: IProps & IClass, state: IState) {
    if (props.match.params.id !== state.keyword) {
      return {
        keyword: props.match.params.id
      };
    }

    return null;
  }

  componentDidUpdate(props: IProps & IClass, state: IState) {
    if (props.match.params.id !== this.props.match.params.id) {
      this.fetchData();
    }
  }

  fetchData = () => {
    searchKeyword(this.state.keyword)
      .then((response) => {
        if (response.statusCode === STATUS_SUCCESS) {
          this.setState({
            users: response.data.Users as Array<IUserSearchResult>,
            subs: response.data.Subs as Array<ISubSearchResult>,
            loading: false
          });
        } else {
          this.props.history.push(RouteNames.notFound);
        }
      })
      .catch(() => this.props.history.push(RouteNames.notFound));
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { classes } = this.props;
    const { subs, users, loading } = this.state;

    return (
      <Container maxWidth={"sm"} style={{ marginTop: loading ? "5vh" : 0 }}>
        {loading ? (
          Array.from({ length: 8 }).map(() => <SearchResultSkeleton />)
        ) : (
          <React.Fragment>
            {!!subs.length && (
              <React.Fragment>
                <Typography
                  color={"textPrimary"}
                  className={classes.sectionTitle}
                >
                  Subreaddits
                </Typography>
                {subs.map((sub) => (
                  <SearchResultCard {...sub} />
                ))}
              </React.Fragment>
            )}
            {!!users.length && (
              <React.Fragment>
                <Typography
                  color={"textPrimary"}
                  className={classes.sectionTitle}
                >
                  Bakers
                </Typography>
                {users.map((user) => (
                  <SearchResultCard {...user} />
                ))}
              </React.Fragment>
            )}
            {!subs.length && !users.length && (
              <Box
                {...{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh"
                }}
              >
                <GiEmptyHourglass size={"15rem"} color={SMOKEY_WHITE} />
                <Typography
                  color={"textPrimary"}
                  variant={"h1"}
                  align={"center"}
                >
                  No Results Found
                </Typography>
              </Box>
            )}
          </React.Fragment>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(SearchResult);
