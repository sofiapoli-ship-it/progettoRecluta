"use client";

import { useState } from "react";

type Props = {
  onPost: (content: string) => void; // callback per aggiungere il post alla lista mock
};

export function CreatePostBox({ onPost }: Props) {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim().length === 0) return;

    onPost(content);
    setContent(""); // reset textarea
  };

  return (
    <div className="bg-[#0D1220] border border-[#1f2937] rounded-xl p-5 mb-6">
      <div className="flex gap-3">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
          S
        </div>

        {/* Input & Actions */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Cosa stai pensando?"
            className="
              w-full bg-[#111827] border border-[#1f2937] 
              text-white rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 resize-none
            "
          />

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-400 text-sm">
              {content.length}/280
            </span>

            <button
              onClick={handlePost}
              className="
                bg-blue-500 hover:bg-blue-600 
                text-white px-4 py-1.5 rounded-lg
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              disabled={content.trim().length === 0}
            >
              Pubblica
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}