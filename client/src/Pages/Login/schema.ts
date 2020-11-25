export const FormDefaultValues = {
  identifier: "",
  password: ""
};

export const FormFields = [
  {
    key: "identifier",
    label: "UserName/Email",
    placeholder: "Enter your username or email",
    ref: "identifierRef"
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Enter your Password",
    ref: "passwordRef"
  }
];

export const FormSchema = {
  identifier: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: {
      maximum: 20,
      message: "must be at max 20 characters"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: {
      minimum: 6,
      message: "must be at least 6 characters long"
    }
  }
};
