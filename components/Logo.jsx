import React from 'react';
import Link from "next/link";

const logo = () => {
  return (
    <Link href="/" className="relative font-semibold text-slate-700">
      <div className="relative text-xl sm:text-2xl">
        <span className="text-green-600">কা</span>কলি<span className="text-green-600 text-3xl sm:text-5xl leading-0">.</span>
        <p className="text-base sm:text-xl -mt-2.5 ml-8">ফা<span className="text-green-600">র্ণি</span>চার</p>
      </div>
      <p className="absolute text-[10px] sm:text-xs font-semibold -top-0.5 sm:-top-1 -right-3 sm:-right-5 px-2.5 sm:px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
        plus
      </p>
    </Link>
  );
};

export default logo;