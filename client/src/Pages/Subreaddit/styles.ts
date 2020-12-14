import { createStyles } from "@material-ui/core";
import subBanner from "../../Assets/sub-banner.jpg";
import { DARK_GREY } from "../../Common/colors";

const rawStyles = {
  postsTitle: {
    fontWeight: 700,
    fontSize: "1rem"
  },
  bannerContainer: {
    minWidth: "100vw",
    height: "15rem",
    backgroundImage: `url(${subBanner})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.7) 20%, rgba(0,212,255,0) 100%)",
    minWidth: "100%",
    minHeight: "100%"
  },
  thumbnail: {
    zIndex: 1,
    border: `8px solid ${DARK_GREY}`
  },
  subTitle: {
    textShadow:
      "-1px -1px 0 #000F, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
