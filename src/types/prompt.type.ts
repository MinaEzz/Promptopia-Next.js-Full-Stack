export type Tcreator = {
  _id: string;
  username: string;
  email: string;
  image: string;
};

export type TPrompt = {
  creator: Tcreator;
  prompt: string;
  tag: string;
  _id: string;
};
