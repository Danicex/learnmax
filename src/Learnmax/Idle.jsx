import React from 'react'
import { IoBulb } from "react-icons/io5";
import { TbHttpGet } from "react-icons/tb";
import { FaHeadphones } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi"; // For More

export default function Idle() {
  return (
       <div className="mt-20 m-auto w-full flex items-center justify-center e">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-6">What can I help with?</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full ring-1 hover:bg-gray-700 transition bg-transparent" id='task-btn'>
        <IoBulb className="text-yellow-400 text-lg" />
            <span>Summarize text</span>
          </div>

          <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full ring-1 hover:bg-gray-700 transition bg-transparent" id='task-btn'>
            <TbHttpGet className="text-red-400 text-lg" />
            <span>Scrape Webpage</span>
          </div>

          <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full ring-1 hover:bg-gray-700 transition bg-transparent" id='task-btn'>
            <FaHeadphones className="text-purple-400 text-lg" />
            <span>Text to Audio</span>
          </div>

          <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full ring-1 hover:bg-gray-700 transition bg-transparent" id='task-btn'>
            <HiOutlineDotsHorizontal className="text-gray-400 text-lg" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
