"use client";

export function PublicTopBar() {
  return (
    <div
      className="sticky top-0 
                 bg-[#030616] 
                 z-20 
                 pt-10 pb-4 
                 backdrop-blur-lg"
    >
      <h1 className="text-3xl font-bold text-white px-16">
        Discover
      </h1>

      {/* Divider */}
      <div className="w-full h-px bg-[#1E2535] mt-4" />
    </div>
  );
}