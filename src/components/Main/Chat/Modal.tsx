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

export const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = api.chat.uploadFile.useMutation();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = await getBase64((inputRef as any).current.files[0]);
    const name = (inputRef as any).current.files[0].name;
    await mutation.mutateAsync({ file, name });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={submitHandler}
        className="relative flex w-[600px] flex-col rounded bg-gray-100 px-5 py-4"
      >
        <h3 className="size text-center text-lg font-bold">Summarise</h3>

        <p
          className="absolute right-6 top-4 cursor-pointer font-bold"
          onClick={closeModal}
        >
          X
        </p>

        <label
          htmlFor="fileUpload"
          className="mt-3 flex h-[400px] w-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 align-middle"
        >
          Select a PDF file to upload
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
