export const FormDefaultValues = {
  identifier: "",
  password: ""
};

export const FormFields = [
  {
    key: "identifier",
    label: "UserName/Email",
    placeholder: "Enter your username or email",
    autofocus: true
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Enter your Password",
    type: "password"
  }
];

export const FormSchema = {
  identifier: {
    presence: { allowEmpty: false, message: "can't be blank. " }
  },
  password: {
    presence: { allowEmpty: false, message: "can't be blank. " }
  }
};
