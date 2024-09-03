"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Avatar, Chip, DatePicker } from "@nextui-org/react";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { today, getLocalTimeZone } from "@internationalized/date";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
}

function Calendar() {
  const [selectedDate, setSelectedDate] = useState();
  const [filterStatus, setFilterStatus] = useState("All appointments");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const calendar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  );

  const [slots, setSlots] = useState([
    {
      name: "Jerry Brown",
      handle: "@jerryb",
      appointment: "Hair curl & color",
      date: "09/03/2024",
      time: "09:30 AM",
      status: "Completed",
    },
    {
      name: "Jerry Brown",
      handle: "@jerryb",
      appointment: "Hair curl & color",
      date: "09/03/2024",
      time: "10:45 AM",
      status: "Cancelled",
    },
    {
      name: "Jerry Brown",
      handle: "@jerryb",
      appointment: "Hair curl & color",
      date: "09/03/2024",
      time: "10:15 AM",
      status: "Cancelled",
    },
    {
      name: "Jerry Brown",
      handle: "@jerryb",
      appointment: "Hair curl & color",
      date: "09/03/2024",
      time: "12:00 PM",
      status: "Cancelled",
    },
    {
      name: "Jerry Brown",
      handle: "@jerryb",
      appointment: "Hair curl & color",
      date: "09/03/2024",
      time: "01:30 PM",
      status: "Booked",
    },
  ]);

  const get24HourTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = minutes.split(" ")[1];
    const adjustedHours =
      period === "PM" ? (parseInt(hours) % 12) + 12 : parseInt(hours);
    return `${adjustedHours}:${minutes.split(" ")[0]}`;
  };

  // grouping  slots by hour
  const groupedSlots = slots
    .filter((slot) => {
      const slotDate = new Date(slot.date);
      const isSameDate =
        !selectedDate ||
        slotDate.toDateString() === new Date(selectedDate).toDateString();
      const isStatusMatch =
        filterStatus === "All appointments" || slot.status === filterStatus;
      return isSameDate && isStatusMatch;
    })
    .reduce((acc, slot) => {
      const hour = get24HourTime(slot.time).split(":")[0];
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(slot);
      return acc;
    }, {});

  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 9); // From 9 AM to 8 PM

  const filteredSlots =
    filterStatus === "All appointments"
      ? slots
      : slots.filter((slot) => slot.status === filterStatus);

  return (
    <div className="relative w-full lg:block">
      {/* calendar */}
      <div className="flex flex-wrap justify-between w-full gap-4 p-6 lg:py-12 lg:px-16">
        <div className="hidden lg:block">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            radius="full"
            size="lg"
            color="secondary"
            variant="bordered"
            style={{
              color: "white",
              borderWidth: "1px !important",
            }}
            defaultValue={today(getLocalTimeZone())}
          />
        </div>
        <div className="block lg:hidden">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            radius="full"
            size="xs"
            color="secondary"
            variant="bordered"
            style={{
              color: "white",
              borderWidth: "1px !important",
            }}
            defaultValue={today(getLocalTimeZone())}
          />
        </div>
        {/* menu */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center">
              <MenuButton className=" inline-flex w-full justify-center gap-x-1.5 rounded-full text-white border-0.5 lg:px-6 px-3 py-2 text-xs lg:text-lg shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-70 opacity-50">
                {filterStatus}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="w-4 h-4 -mr-1 text-gray-400 lg:w-8 lg:h-8 filtered"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute bg-default-50 right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem onClick={() => setFilterStatus("All appointments")}>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-white text-gray-700 opacity-70 data-[focus]:bg-gray-100  data-[focus]:opacity-30 data-[focus]:text-black"
                  >
                    All
                  </a>
                </MenuItem>
                <MenuItem onClick={() => setFilterStatus("Cancelled")}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-white text-gray-700 opacity-70 data-[focus]:bg-gray-100  data-[focus]:opacity-30 data-[focus]:text-black rounded-lg"
                  >
                    Cancelled
                  </a>
                </MenuItem>
                <MenuItem onClick={() => setFilterStatus("Completed")}>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-white text-gray-700 opacity-70 data-[focus]:bg-gray-100  data-[focus]:opacity-30 data-[focus]:text-black"
                  >
                    Completed
                  </a>
                </MenuItem>
                <MenuItem onClick={() => setFilterStatus("Booked")}>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-white text-gray-700 opacity-70 data-[focus]:bg-gray-100  data-[focus]:opacity-30 data-[focus]:text-black"
                  >
                    Booked
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          <div className="w-auto p-1 border border-white rounded-full opacity-50 lg:p-2 hover:opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="lg:size-6 size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="py-4 lg:py-8 bg-primaryGray">
        {/* status chips */}
        <div className="absolute top-0 right-0 flex flex-col w-auto gap-2 px-8 py-4 lg:pb-12 lg:px-16 lg:w-full lg:flex-row lg:relative lg:gap-8">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-white border border-2 border-green-500 rounded-full chips">
            <div className="w-2 h-2 bg-green-500 rounded-full chip"></div>
            Completed
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-white border border-2 border-blue-800 rounded-full chips">
            <div className="w-4 h-4 bg-blue-800 rounded-full chip"></div>
            Booked
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-white border border-2 border-red-500 rounded-full chips">
            <div className="w-4 h-4 bg-red-500 rounded-full chip"></div>
            Cancelled
          </div>
        </div>
        {/* Time Slots and Appointments */}
        <div className="flex flex-col">
          {timeSlots.map((hour) => {
            const hourFormatted = hour < 8 ? `0${hour}` : hour.toString();
            const hour12Format = hour % 12 === 0 ? 12 : hour % 12;
            const period = hour < 12 ? "AM" : "PM";
            const hourLabel = `${hour12Format}:00 ${period}`;

            return (
              <div key={hour} className="flex flex-col mb-6">
                {/* Hour Label */}
                <div className="relative flex items-center mb-2 text-gray-400 border-b border-gray-700 border-dashed">
                  <span className="absolute w-1/12 text-center w-28 bg-primaryGray">
                    {hourLabel}
                  </span>
                </div>
                {/* Slots within this hour */}
                <div className="flex flex-wrap gap-4 px-6 py-4 pl-20 overflow-scroll lg:pl-32 slot">
                  {groupedSlots[hourFormatted] &&
                    groupedSlots[hourFormatted].map((slot) => (
                      <div
                        key={slot.id}
                        className={`relative flex items-center bg-white justify-between slot-card lg:w-1/3 w-full p-4 rounded-2xl shadow-md text-white border ${
                          slot.status === "Completed"
                            ? "border-green-500"
                            : slot.status === "Booked"
                            ? "border-blue-500"
                            : "border-red-500"
                        }`}
                      >
                        <div
                          className={`absolute top-0 right-0 p-3 py-2 text-xs text-white rounded-2xl slot-chip  ${
                            slot.status === "Completed"
                              ? "bg-green-500"
                              : slot.status === "Booked"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        >
                          {slot.status}
                        </div>
                        <div className="flex flex-col gap-4 py-9">
                          <div>
                            <div className="flex items-center gap-3">
                              <Avatar
                                isBordered
                                radius="sm"
                                size="md"
                                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                              />
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                  <p className="text-sm leading-none text-black">
                                    {slot.name}
                                  </p>
                                </div>
                                <span className="text-xs tracking-tight text-black opacity-60">
                                  {slot.handle}
                                </span>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-black opacity-70">
                            {slot.appointment}
                          </h3>
                          <p className="flex items-center gap-2 text-xs text-black opacity-50">
                            {calendar} {formatDate(slot.date)} - {slot.time}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
