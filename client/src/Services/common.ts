export const formatNumberNotation = (number = 0) => {
  if (number >= 100000) {
    return (number / 100000).toFixed(1).replace(/\$/, "") + `L`;
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\$/, "") + `K`;
  }
  return number;
};

export const getTruncatedContent = (
  content: string,
  length: number,
  additionalContent = ""
) => {
  return content.length > length
    ? `${content.slice(0, length)}...${additionalContent}`
    : content;
};

export const tabProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
};
