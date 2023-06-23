interface FormProps {
  submitHandler: (e: React.SyntheticEvent) => Promise<void>;
  disabled: boolean;
  text: string;
  onTextChange: (val: string) => void;
}

export const Form = ({
  submitHandler,
  disabled,
  text,
  onTextChange,
}: FormProps) => {
  return (
    <form
      onSubmit={submitHandler}
      className="flex w-full justify-between align-middle"
    >
      <input
        type="text"
        className="ml-2 flex-1 border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        placeholder="Start typing..."
        onChange={(e) => onTextChange(e.target.value)}
        value={text}
      />
      <div className="flex gap-x-2 align-middle">
        <button
          type="submit"
          className="cursor-pointer outline-none disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
        >
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </button>
      </div>
    </form>
  );
};
