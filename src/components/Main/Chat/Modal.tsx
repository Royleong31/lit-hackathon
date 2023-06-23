export const Modal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[600px] flex-col rounded bg-gray-100 px-5 py-4">
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
          type="file"
          name="fileUpload"
          id="fileUpload"
          placeholder="fsad"
          accept="application/pdf"
          className="hidden"
        />
      </div>
    </div>
  );
};
