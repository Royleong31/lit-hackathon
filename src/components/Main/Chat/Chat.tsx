/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { Modal } from "./Modal";
import { ChatContainer } from "./ChatContainer";
import { api } from "~/utils/api";
import { type Message, MessageType, type ChatHistory } from "types/Message";

export const Chat = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "api",
      text: "Hello, I am Lawry. How can I help you today?",
    },
    {
      sender: "api",
      text: "Hello, I am Lawry. How can I help you today?",
    },
    {
      sender: "user",
      text: "Hello, I am Lawry. How can I help you today?",
    },
  ]);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const mutation = api.chat.sendMessage.useMutation();

  const submitHandler = async (type: MessageType) => {
    console.log("submitting", text);
    try {
      const result = await mutation.mutateAsync({
        history: chatHistory,
        type,
        prompt: text,
      });

      if (result.response) {
        console.log(result.response);
        setMessages((prev) => [
          ...prev,
          { sender: "user", text }, // TODO: Confirm this
          { sender: "api", text: result.response.text as unknown as string }, // TODO: Confirm this
        ]);

        setChatHistory((prev) => [...prev, [text, result.response.text]]);
      }

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  // calc(100vh - 40px) because the total vertical padding on this container's parent is 40px
  return (
    <div className="grid h-[calc(100vh-40px)] grid-rows-[min-content_min-content_1fr_min-content] flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Start a chat with Lawry</p>
        <div className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-300 px-4 py-2">
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
            <p className="font-bold">Marcus Hooi</p>
            <p className="font-light text-gray-600">Client</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-neutral-700" />

      <ChatContainer history={messages} />

      <div className="flex flex-1 flex-col justify-end">
        <div className="mb-6 flex justify-center gap-x-6 align-middle">
          <div className="w-[180px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center">
            Compare past cases
          </div>
          <div className="border-r-2 border-gray-500" />
          <div
            className="w-[180px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center"
            onClick={() => setModalOpen(true)}
          >
            Summarise
          </div>
          <div className="border-r-2 border-gray-500" />
          <div className="w-[180px] cursor-pointer rounded-lg bg-gray-200 px-3 py-1 text-center">
            Research
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-gray-300 p-3">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4361_1071)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.34375 13C2.34375 10.3064 3.41378 7.72311 5.31845 5.81845C7.22311 3.91378 9.80639 2.84375 12.5 2.84375C15.1936 2.84375 17.7769 3.91378 19.6816 5.81845C21.5863 7.72311 22.6562 10.3064 22.6562 13C22.6562 15.6936 21.5863 18.2769 19.6816 20.1816C17.7769 22.0863 15.1936 23.1562 12.5 23.1562C9.80639 23.1562 7.22311 22.0863 5.31845 20.1816C3.41378 18.2769 2.34375 15.6936 2.34375 13ZM12.5 0.5C9.1848 0.5 6.00537 1.81696 3.66117 4.16117C1.31696 6.50537 0 9.6848 0 13C0 16.3152 1.31696 19.4947 3.66117 21.8389C6.00537 24.183 9.1848 25.5 12.5 25.5C15.8152 25.5 18.9947 24.183 21.3389 21.8389C23.683 19.4947 25 16.3152 25 13C25 9.6848 23.683 6.50537 21.3389 4.16117C18.9947 1.81696 15.8152 0.5 12.5 0.5ZM7.8125 13C8.22691 13 8.62433 12.8354 8.91736 12.5424C9.21037 12.2493 9.375 11.8519 9.375 11.4375C9.375 11.0231 9.21037 10.6257 8.91736 10.3326C8.62433 10.0396 8.22691 9.875 7.8125 9.875C7.39809 9.875 7.00067 10.0396 6.70764 10.3326C6.41463 10.6257 6.25 11.0231 6.25 11.4375C6.25 11.8519 6.41463 12.2493 6.70764 12.5424C7.00067 12.8354 7.39809 13 7.8125 13ZM18.75 11.4375C18.75 11.8519 18.5853 12.2493 18.2923 12.5424C17.9994 12.8354 17.6019 13 17.1875 13C16.7731 13 16.3756 12.8354 16.0827 12.5424C15.7897 12.2493 15.625 11.8519 15.625 11.4375C15.625 11.0231 15.7897 10.6257 16.0827 10.3326C16.3756 10.0396 16.7731 9.875 17.1875 9.875C17.6019 9.875 17.9994 10.0396 18.2923 10.3326C18.5853 10.6257 18.75 11.0231 18.75 11.4375ZM8.3125 15.5562C8.56459 15.3797 8.876 15.3095 9.17947 15.3606C9.48294 15.4118 9.75409 15.5803 9.93437 15.8297L9.94531 15.8438C10.106 16.028 10.2898 16.1908 10.4922 16.3281C10.9047 16.6063 11.5594 16.9062 12.5 16.9062C13.4406 16.9062 14.0938 16.6062 14.5078 16.3266C14.7102 16.1892 14.894 16.0265 15.0547 15.8422L15.0656 15.8297C15.2459 15.5765 15.5194 15.4053 15.8258 15.3537C16.1323 15.3021 16.4469 15.3744 16.7 15.5547C16.9531 15.735 17.1244 16.0084 17.1759 16.3148C17.2275 16.6214 17.1553 16.9359 16.975 17.1891L16.0156 16.5156C16.975 17.1875 16.975 17.1891 16.9734 17.1891V17.1906L16.9719 17.1938L16.9688 17.1984L16.9609 17.2094L16.9391 17.2391C16.8512 17.3567 16.7552 17.4678 16.6516 17.5719C16.4005 17.8319 16.123 18.0648 15.8234 18.2672C14.8394 18.9209 13.6814 19.2634 12.5 19.25C11.0219 19.25 9.91875 18.7687 9.17813 18.2656C8.78623 18.0005 8.43244 17.683 8.12656 17.3219C8.10422 17.2947 8.08234 17.267 8.06094 17.2391L8.03906 17.2078L8.03125 17.1984L8.02812 17.1938V17.1906H8.02656L8.98438 16.5156L8.025 17.1875C7.84681 16.9331 7.77684 16.6186 7.83045 16.3127C7.88408 16.0069 8.05687 15.7348 8.31094 15.5562H8.3125Z"
                fill="#2C2C2E"
              />
            </g>
            <defs>
              <clipPath id="clip0_4361_1071">
                <rect
                  width="25"
                  height="25"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <input
            type="text"
            className="ml-2 flex-1 border-none bg-transparent  outline-none"
            placeholder="Start typing..."
            onChange={(val) => setText(val.target.value)}
            value={text}
          />
          <div className="flex gap-x-2 align-middle">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => submitHandler(MessageType.RESEARCH)}
            >
              <g clip-path="url(#clip0_4361_1078)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.48701 4.73821L3.72005 11.8282H11.3281C11.9754 11.8282 12.5 12.3528 12.5 13.0001C12.5 13.6473 11.9754 14.1719 11.3281 14.1719H3.72005L2.48701 21.2619L21.7647 13.0001L2.48701 4.73821ZM1.54492 13.0001L0.0994995 4.68886C-0.0173514 4.01697 0.200058 3.33024 0.68229 2.848C1.2882 2.2421 2.20198 2.06611 2.98959 2.40366L23.9308 11.3784C24.5794 11.6565 25 12.2943 25 13.0001C25 13.7058 24.5794 14.3437 23.9308 14.6217L2.98959 23.5964C2.20198 23.9341 1.2882 23.758 0.68229 23.1522C0.200058 22.6698 -0.0173518 21.9831 0.0994995 21.3113L1.54492 13.0001Z"
                  fill="#212529"
                />
              </g>
              <defs>
                <clipPath id="clip0_4361_1078">
                  <rect
                    width="25"
                    height="25"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </div>
  );
};
