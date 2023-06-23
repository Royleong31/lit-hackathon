/* eslint-disable @typescript-eslint/no-misused-promises */
import { Document } from "langchain/document";
import { useState } from "react";
import { Modal } from "./Modal";
import { ChatContainer } from "./ChatContainer";
import { api } from "~/utils/api";
import { type Message, MessageType, type ChatHistory } from "types/Message";
import { Form } from "./Form";
import { ChainValues } from "langchain/dist/schema";

export const Chat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "api",
      text: "Hello, I am Lawry. How can I help you today?",
    },
  ]);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const mutation = api.chat.sendMessage.useMutation();

  const onUploadHandler = (data: ChainValues) => {
    console.log(data);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "Summarise the uploaded file" }, // TODO: Confirm this
      {
        sender: "api",
        text: data.text as unknown as string,
        sourceDocs: data.sourceDocuments as unknown as Document[],
      }, // TODO: Confirm this
    ]);
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("submitting", text);
    try {
      const result = await mutation.mutateAsync({
        history: chatHistory,
        type: MessageType.SUMMARISE,
        prompt: text,
      });

      if (result.response) {
        console.log(result.response);
        setMessages((prev) => [
          ...prev,
          { sender: "user", text }, // TODO: Confirm this
          {
            sender: "api",
            text: result.response.text as unknown as string,
            sourceDocs: result.response
              .sourceDocuments as unknown as Document[],
          }, // TODO: Confirm this
        ]);

        setChatHistory((prev) => [...prev, [text, result.response.text]]);
      }

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(messages);

  // calc(100vh - 40px) because the total vertical padding on this container's parent is 40px
  return (
    <div className="grid h-[calc(100vh-40px)] grid-rows-[min-content_min-content_1fr_min-content] flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Case Research</p>
        <div className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-300 px-2 py-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4361_1337)">
              <path
                d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_4361_1337">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className="flex flex-col">
            <p className="text-[12px] font-bold">Marcus Hooi</p>
            <p className="text-[10px] font-light text-gray-600">Client</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-neutral-700" />

      <ChatContainer history={messages} />

      <div className="flex flex-1 flex-col justify-end">
        <div className="mb-6 flex justify-center gap-x-6 align-middle">
          <div className="w-[200px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center font-semibold drop-shadow-sm">
            Upload to chat
          </div>
          <div className="border-r-2 border-gray-500" />
          <div className="w-[200px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center font-semibold drop-shadow-sm">
            Compare Past Cases
          </div>
          <div className="border-r-2 border-gray-500" />
          <div
            className="w-[200px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center font-semibold drop-shadow-sm"
            onClick={() => setModalOpen(true)}
          >
            Summarise
          </div>
          <div className="border-r-2 border-gray-500" />
          <div className="w-[200px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center font-semibold drop-shadow-sm">
            Research
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-gray-300 p-3">
          <Form
            disabled={mutation.isLoading}
            onTextChange={setText}
            text={text}
            submitHandler={submitHandler}
          />
        </div>
      </div>

      {modalOpen && (
        <Modal
          onUploadHandler={onUploadHandler}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
