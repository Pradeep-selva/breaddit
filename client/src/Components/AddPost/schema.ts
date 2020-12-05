export const FormDefaultValues = {
  Content: "",
  Link: "",
  Title: "",
  Image: null
};

export const FormFields = [
  {
    key: "Content",
    label: "Content",
    placeholder: "What do you want to say?",
    autofocus: true
  },
  {
    key: "Link",
    label: "Link",
    placeholder: "Add a link"
  },
  {
    key: "Link",
    label: "Link",
    placeholder: "Add a link"
  },
  {
    key: "Link",
    label: "Link",
    placeholder: "Add a link"
  },
  {
    key: "Image",
    label: "Image",
    placeholder: "Add an image"
  }
];

export const FormSchema = {
  Title: {
    presence: { allowEmpty: false, message: "can't be blank. " }
  }
};
