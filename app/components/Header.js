"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@nextui-org/react";
import React, { useState } from "react";

function Header({ menuItems }) {
  const [selectedItem, setSelectedItem] = useState("Scheduler");

  return (
    <div className="flex items-center justify-between px-6 py-6 bg-primaryGray">
      {/* avatar */}
      <div className="flex items-center gap-2 opacity-90">
        <div>
          <Avatar
            isBordered
            radius="sm"
            size="sm"
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-sm leading-none text-white">Royal Salons</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <span className="text-xs tracking-tight text-white opacity-60">
            Hair & Makeup
          </span>
        </div>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full text-white border-0.5 px-6 py-2 text-xs shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-70 opacity-50">
            {selectedItem}
            <ChevronDownIcon
              aria-hidden="true"
              className="w-4 h-4 -mr-1 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute bg-default-50 right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => setSelectedItem(item.label)}
              >
                <a
                  href="#"
                  className="flex items-center block px-2 py-1 text-xs text-white rounded-lg gap-x-2 opacity-70 hover:bg-gray-100 hover:opacity-100 hover:text-black"
                >
                  {item.icon}
                  {item.label}
                </a>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default Header;
