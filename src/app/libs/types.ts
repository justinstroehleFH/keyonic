export type Password = {
  id: string;
  title: string;
  username: string;
  password: string;
  url: string;
  label: string[];
};

export type Label = {
  id: string;
  labelName: string;
  icon: string;
};

export type LabelURL = {
  id: string;
  labelName: string;
  icon: string;
  url: string;
};
