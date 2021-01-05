import React, { Component } from "react";
import { searchKeyword } from "../../APIs";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { IUserSearchResult, ISubSearchResult } from "../../Types";

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
}

class SearchResult extends Component<IProps, IState> {
  keyword: string;
  constructor(props: IProps) {
    super(props);
    this.keyword = props.match.params.id;

    this.state = {
      users: [],
      subs: []
    };
  }

  componentDidMount() {
    searchKeyword(this.keyword).then((response) => {
      if (response.statusCode === STATUS_SUCCESS) {
        this.setState({
          users: response.data.Users as Array<IUserSearchResult>,
          subs: response.data.Subs as Array<ISubSearchResult>
        });
      } else {
        this.props.history.push(RouteNames.notFound);
      }
    });
  }

  render() {
    console.log(this.state);
    return <div></div>;
  }
}

export default SearchResult;
