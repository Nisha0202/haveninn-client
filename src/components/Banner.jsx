import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';

export function Banner() {
    const [visible, setVisible] = useState(true)
  return (
    <div className={`bg-gray-50 dark:bg-gray-700 ${!visible && 'hidden'}`}>
      <div className="flex w-full justify-between border-b border-gray-200 p-4 dark:border-gray-600">
        <div className="mx-auto flex items-center">
          <p className="flex items-center justify-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4" />
            <span className="[&_p]:inline"> Sign up to our  <a href='/signup'
                className="inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"  >
                Newsletter </a>  to Get Interesting Insights
            </span>
          </p>
        </div>
        <button className="border-0 bg-transparent text-gray-500 dark:text-gray-400" onClick={() => setVisible(false)}>
          <HiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}