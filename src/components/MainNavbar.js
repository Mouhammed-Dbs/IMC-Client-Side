"use client";

export default function MainNavbarNavbar() {
  return (
    <header className="sticky bg-slate-700 text-white py-3 px-4 flex items-center justify-between w-full border-b-1 border-slate-300 shadow-md">
      <div>
        <h1 className="text-lg md:text-2xl font-bold min-w-max">Chat AI</h1>
      </div>

      <div className="flex absolute right-5  md:gap-4">Info-user</div>
    </header>
  );
}
