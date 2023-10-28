/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SubmitBtn from "../SubmitButton/SubmitBtn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Test({
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  onClick,
  onClickA,
  onClickB,
  onClickC,
  onClickD,
  children,
}) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left w-full"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {question}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 right-0 w-full z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 border-none ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
                  <label className="flex gap-2 py-5 px-2.5">
                    <input
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      type="radio"
                      value={optionA}
                      name="optionsGroup"
                      onClick={() => onClickA(optionA)}
                    />
                    {optionA}
                  </label>

                  <label className="flex gap-2 py-5 px-2.5">
                    <input
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      type="radio"
                      value={optionB}
                      name="optionsGroup"
                      onClick={() => onClickB(optionB)}
                    />
                    {optionB}
                  </label>
                  <label className="flex gap-2 py-5 px-2.5">
                    <input
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      type="radio"
                      value={optionC}
                      name="optionsGroup"
                      onClick={() => onClickC(optionC)}
                    />
                    {optionC}
                  </label>
                  <label className="flex gap-2 py-5 px-2.5">
                    <input
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      type="radio"
                      value={optionD}
                      name="optionsGroup"
                      onClick={() => onClickD(optionD)}
                    />
                    {optionD}
                  </label>
                </>
              )}
            </Menu.Item>
          </div>
          <Menu.Item>{children}</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
