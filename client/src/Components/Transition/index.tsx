import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";
import { Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default Transition;
