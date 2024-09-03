import { Avatar } from "@nextui-org/react";
import React from "react";

function Sidebar({ handleOpen, sidebar, menuItems }) {
  const backArr = (
    <div className="p-2 bg-white rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="black"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );

  const members = [
    {
      title: "Esther Howard",
      designation: "COORDINATOR",
      image:
        "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Jacob Jones",
      designation: "MANAGER",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cody Fisher",
      designation: "TEAM LEAD",
      image:
        "https://plus.unsplash.com/premium_photo-1664874603108-2c248e432f8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    },
  ];

  return (
    <div className="relative">
      {sidebar && (
        <div className="flex flex-col h-screen px-12 bg-secondaryGray border-r-1 border-lavendar">
          {/* avatar */}
          <div className="flex items-center gap-2 my-16 opacity-90">
            <div>
              <Avatar
                isBordered
                radius="sm"
                size="md"
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-lg leading-none text-white">Royal Salons</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <span className="tracking-tight text-white text-small opacity-60">
                Hair & Makeup
              </span>
            </div>
          </div>

          {/* main */}

          <ul className="flex flex-col gap-2 mt-8 mb-16 opacity-70">
            {menuItems.map((items) => {
              return (
                <li
                  key={items.label}
                  className="flex items-center gap-2 px-2 py-1 text-white transition-colors duration-200 rounded cursor-pointer menu"
                >
                  <div>{items.icon}</div>
                  <div>{items.label}</div>
                </li>
              );
            })}
          </ul>

          {/* team members */}

          <div>
            <p className="text-sm text-white uppercase opacity-50 spacing-1 font-smeibold">
              Team Members
            </p>
            <div className="flex flex-col gap-2 my-8 opacity-70">
              {members.map((item) => {
                return (
                  <div className="flex items-center gap-2 opacity-90 member-menu">
                    <div>
                      <Avatar
                        isBordered
                        radius="sm"
                        size="md"
                        src={item.image}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg leading-none text-white">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-xs tracking-tight text-white opacity-60">
                        {item.designation}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleOpen}
        className={` ${
          sidebar ? "absolute" : "relative mt-24 h-screen"
        } top-[10%] right-[-5%]`}
      >
        {backArr}
      </div>
    </div>
  );
}

export default Sidebar;
