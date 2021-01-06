export const FormDefaultValues = {
  Content: "",
  Link: "",
  Title: "",
  Image: {} as File,
  Sub: ""
};

export const tabTypes: any = {
  0: "Content",
  1: "Image",
  2: "Link"
};

export const FormSchema = (tabValue: number) => ({
  Title: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: { maximum: 200 }
  },
  Sub: {
    presence: { allowEmpty: false, message: "can't be blank. " }
  },
  [`${tabTypes[tabValue]}`]: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: tabTypes[tabValue] === "Content" ? { maximum: 1000 } : null
  },
  Link:
    tabValue === 2
      ? {
          url: true
        }
      : {}
});
