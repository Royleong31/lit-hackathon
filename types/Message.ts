export interface Message {
  sender: "user" | "api";
  text: string;
}

export enum MessageType {
  RESEARCH = "RESEARCH",
  SUMMARISE = "SUMMARISE",
}

type Question = string;
type Answer = string;

export type ChatHistory = [Question, Answer];
