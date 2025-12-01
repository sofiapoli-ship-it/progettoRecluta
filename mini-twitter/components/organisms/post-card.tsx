import { Heart, MessageCircle } from "lucide-react";

type Props = {
  username: string;
  handle: string;
  time: string | Date;     // ← CORRETTO QUI
  content: string;
  likes: number;
  comments: number;
};

export function PostCard({
  username,
  handle,
  content,
  time,
  likes,
  comments,
}: Props) {

  // Conversione sicura della data
  const date =
    typeof time === "string"
      ? new Date(time)
      : time instanceof Date
      ? time
      : null;

  const formattedTime = date
    ? date.toLocaleString("it-IT", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <div className="w-full py-5 px-2 rounded-xl bg-[#111827]/20 hover:bg-[#111827]/30 transition">

      {/* HEADER */}
      <div className="flex items-start gap-3">

        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
          {username[0].toUpperCase()}
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-[15px] text-white">
            {username}
          </span>
          <span className="text-neutral-400 text-[13px]">
            {handle}
          </span>
          <span className="text-neutral-500 text-[12px]">
            {formattedTime}
          </span>
        </div>

      </div>

      <p className="text-neutral-200 text-[15px] mt-4 mb-4 ml-1">
        {content}
      </p>

      <div className="flex items-center gap-8 text-[#9CA3AF] text-[14px] ml-1">

        <div className="flex items-center gap-1 hover:text-pink-400 transition cursor-pointer">
          <Heart size={17} />
          <span>{likes}</span>
        </div>

        <div className="flex items-center gap-1 hover:text-blue-400 transition cursor-pointer">
          <MessageCircle size={17} />
          <span>{comments}</span>
        </div>

      </div>

    </div>
  );
}