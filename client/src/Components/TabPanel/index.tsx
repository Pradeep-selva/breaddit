import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
  style: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, style, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={style}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
