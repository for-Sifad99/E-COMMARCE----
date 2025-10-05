'use client';

export function CustomMenuIcon({ className }) {
  return (
    <div className={`flex flex-col justify-between h-5 w-6 ${className}`}>
      <span className="block h-1 group-hover:w-5.5 group-hover:ml-1 rounded-full bg-[#00a63e] transition-all duration-100" />
      <span className="block h-1 group-hover:w-4.5 group-hover:ml-2 rounded-full bg-[#FFAD51] transition-all duration-100" />
      <span className="block h-1 group-hover:w-5.5 group-hover:ml-1   rounded-full bg-[#78B2FF] transition-all duration-100" />
    </div>
  );
}
