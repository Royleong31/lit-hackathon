import { type Message } from "types/Message";
import { Accordion } from "~/components/Accordion";

export const ChatContainer = ({ history }: { history: Message[] }) => {
  return (
    <div className="h-full justify-end overflow-y-auto rounded-lg bg-blue-100 p-3 pt-0 drop-shadow">
      {history.map((message, index) => (
        <div
          key={index}
          className={`drop-shadow ${
            message.sender === "user" ? "ml-auto" : ""
          } mt-2 max-w-md rounded-lg ${
            message.sender === "user" ? "bg-blue-600" : "bg-gray-200"
          } ${message.sender === "user" ? "text-white" : "text-black"} p-4`}
        >
          <div>{message.text}</div>

          {message.sourceDocs && message.sourceDocs.length > 0 && (
            <Accordion
              details={message.sourceDocs?.map((doc, i) => ({
                title: `Source ${i + 1}`,
                content: doc.pageContent as string,
              }))}
            />
          )}
        </div>
      ))}
    </div>
  );
};
