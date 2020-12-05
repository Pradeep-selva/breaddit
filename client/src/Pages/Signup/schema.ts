interface defaultType {
  userName: string;
  email: string;
  password: "";
  confirmPassword?: "";
}

export const FormDefaultValues: defaultType = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const FormFields = [
  {
    key: "userName",
    label: "UserName",
    placeholder: "Enter your username",
    autofocus: true
  },
  {
    key: "email",
    label: "Email",
    placeholder: "Enter your email"
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password"
  },
  {
    key: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password"
  }
];

export const FormSchema = {
  userName: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    length: {
      maximum: 20,
      message: "must be at max 20 characters"
    }
  },
  email: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    format: {
      pattern: /\S+@\S+\.\S+/,
      message: "must be a valid Email ID"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "can't be blank. " }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: "can't be blank. " },
    equality: "password"
  }
};
