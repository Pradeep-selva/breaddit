export type FormValuesType = Record<"Bio" | "Location" | "Status", string> &
  Record<"Avatar", File>;

export const FormSchema = {
  Bio: {
    length: { maximum: 120 }
  },
  Location: {
    length: { maximum: 30 }
  },
  Status: {
    length: { maximum: 75 }
  }
};
