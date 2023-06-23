import { type Message } from "types/Message";

export const ChatContainer = ({ history }: { history: Message[] }) => {
  return (
    <div className="h-full justify-end overflow-y-auto  p-3 pt-0">
      {history.map((message, index) => (
        <div
          key={index}
          className={`${
            message.sender === "user" ? "ml-auto" : ""
          } mt-2 max-w-md rounded-lg ${
            message.sender === "user" ? "bg-blue-600" : "bg-slate-200"
          } ${message.sender === "user" ? "text-white" : "text-black"} p-4`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};
