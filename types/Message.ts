export interface Message {
  sender: "user" | "api";
  text: string;
}

export enum MessageType {
  RESEARCH = "RESEARCH",
  SUMMARISE = "SUMMARISE",
}
