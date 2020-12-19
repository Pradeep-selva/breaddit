export const FormDefaultValues = {
  Name: "",
  Description: "",
  Tags: "",
  Thumbnail: (null as unknown) as File
};

export const FormSchema = {
  Name: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: { maximum: 30 }
  },
  Description: {
    length: { maximum: 100 }
  }
};
