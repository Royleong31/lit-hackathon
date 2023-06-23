import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface AccordionDetail {
  title: string;
  content: string;
}

interface AccordionProps {
  details: AccordionDetail[];
}

export function Accordion({ details }: AccordionProps) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full max-w-md rounded-lg bg-gray-50 p-2">
        {details.map((detail, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="mt-3 flex w-full justify-between rounded bg-slate-200 px-4 py-2 text-left text-sm  font-medium focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                  <span>{detail.title}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } text-black-500 h-5 w-5`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 ">
                  {detail.content}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
