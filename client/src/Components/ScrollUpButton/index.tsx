import React from "react";
import {
  IconButton,
  Slide,
  useMediaQuery,
  useScrollTrigger
} from "@material-ui/core";
import { IoIosArrowUp } from "react-icons/io";
import { LIGHT_BLACK, SMOKEY_WHITE } from "../../Common/colors";

const ScrollUpButton = () => {
  const trigger = useScrollTrigger();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showScroll, setShowScroll] = React.useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <Slide direction={"up"} in={!trigger}>
      <IconButton
        style={{
          backgroundColor: LIGHT_BLACK,
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          display: showScroll ? "flex" : "none"
        }}
        onClick={scrollTop}
      >
        <IoIosArrowUp color={SMOKEY_WHITE} size={isMobile ? "2rem" : "3rem"} />
      </IconButton>
    </Slide>
  );
};

export default ScrollUpButton;
