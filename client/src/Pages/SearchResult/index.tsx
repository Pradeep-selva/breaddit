import React, { Component } from "react";
import { Container, Typography, withStyles } from "@material-ui/core";
import { searchKeyword } from "../../APIs";
import { SearchResultCard } from "../../Components";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { IUserSearchResult, ISubSearchResult } from "../../Types";
import { styles, IClass } from "./styles";

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
}

class SearchResult extends Component<IProps & IClass, IState> {
  keyword: string;
  constructor(props: IProps & IClass) {
    super(props);
    this.keyword = props.match.params.id;

    this.state = {
      users: [],
      subs: [],
      loading: false
    };
  }

  componentDidMount() {
    this.toggleLoading();

    searchKeyword(this.keyword)
      .then((response) => {
        if (response.statusCode === STATUS_SUCCESS) {
          this.setState({
            users: response.data.Users as Array<IUserSearchResult>,
            subs: response.data.Subs as Array<ISubSearchResult>
          });
        } else {
          this.props.history.push(RouteNames.notFound);
        }
      })
      .catch(() => this.props.history.push(RouteNames.notFound))
      .finally(() => this.toggleLoading());
  }

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { classes } = this.props;
    const { subs, users } = this.state;
    console.log(this.state);
    return (
      <Container maxWidth={"sm"}>
        <Typography color={"textPrimary"} className={classes.sectionTitle}>
          Subreaddits
        </Typography>
        {subs.map((sub) => (
          <SearchResultCard {...sub} />
        ))}
        <Typography color={"textPrimary"} className={classes.sectionTitle}>
          Bakers
        </Typography>
        {users.map((user) => (
          <SearchResultCard {...user} />
        ))}
      </Container>
    );
  }
}

export default withStyles(styles)(SearchResult);
