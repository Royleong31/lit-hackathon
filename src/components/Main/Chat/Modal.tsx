import { ChainValues } from "langchain/dist/schema";
import { type ChangeEventHandler, useState, useRef } from "react";
import { api } from "~/utils/api";

function getBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as any);
    reader.onerror = (error) => reject(error);
  });
}

interface ModalProps {
  closeModal: () => void;
  onUploadHandler: (text: ChainValues) => void;
}

export const Modal = ({ closeModal, onUploadHandler }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = api.chat.uploadFile.useMutation();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = async () => {
    closeModal();
    const file = await getBase64((inputRef as any).current.files[0]);

    const name = (inputRef as any).current?.files[0]?.name ?? "placeholder";
    const result = await mutation.mutateAsync({ file, name });

    if (result.response) {
      onUploadHandler(result.response);
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <form className="relative flex w-[500px] flex-col rounded bg-gray-100 px-5 py-4 drop-shadow">
        <h3 className="size text-center text-lg font-bold">Summarise</h3>

        <p
          className="absolute right-6 top-4 cursor-pointer font-bold"
          onClick={closeModal}
        >
          X
        </p>

        <label
          htmlFor="fileUpload"
          className="mt-3 flex h-[300px] w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 align-middle"
        >
          <button className="pointer-events-none	 rounded-xl bg-blue-600 px-4 py-2 text-lg font-bold tracking-wide text-white">
            Click to Upload
          </button>
        </label>
        <input
          ref={inputRef}
          onChange={handleOnChange}
          type="file"
          name="fileUpload"
          id="fileUpload"
          placeholder="fsad"
          accept="application/pdf"
          className="hidden"
        />
      </form>
    </div>
  );
};
