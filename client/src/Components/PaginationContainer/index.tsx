import React from "react";

interface IProps {
  children: any;
  handlePagination: Function;
}

const PaginationContainer = ({ children, handlePagination }: IProps) => {
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset + window.innerHeight ===
        document.body.clientHeight
      )
        handlePagination();
    });
  }, []);

  return children;
};

export default PaginationContainer;
