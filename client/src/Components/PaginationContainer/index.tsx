import { Component } from "react";

interface IProps {
  children: any;
  handlePagination: Function;
}

class PaginationContainer extends Component<IProps> {
  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    if (window.pageYOffset + window.innerHeight === document.body.clientHeight)
      this.props.handlePagination();
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default PaginationContainer;
