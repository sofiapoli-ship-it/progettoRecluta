import { Heart, MessageCircle } from "lucide-react";

type Props = {
  username: string;
  handle: string;
  time: Date | null;
  content: string;
  likes: number;
  comments: number;
};

export function PostCard({
  username,
  handle,
  time,
  content,
  likes,
  comments,
}: Props) {
  
  // Se la data non esiste → mostriamo solo "—"
  const formattedTime = time
    ? time.toLocaleString("it-IT", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <article className="border-b border-[#1F2937] py-5 px-4 hover:bg-[#111827] transition">

      {/* HEADER */}
      <div className="flex items-start gap-3">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
          {username[0]?.toUpperCase()}
        </div>

        {/* USER INFO */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-[15px]">{username}</span>
            <span className="text-neutral-400 text-[14px]">@{handle}</span>
            <span className="text-neutral-500 text-[14px]">· {formattedTime}</span>
          </div>
        </div>

      </div>

      {/* CONTENT */}
      <p className="text-neutral-200 text-[15px] mt-4 mb-4 ml-1 whitespace-pre-line">
        {content}
      </p>

      {/* FOOTER */}
      <div className="flex items-center gap-8 text-[#9CA3AF] text-sm ml-1">

        <div className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer">
          <Heart size={17} />
          <span>{likes}</span>
        </div>

        <div className="flex items-center gap-1 hover:text-blue-400 transition cursor-pointer">
          <MessageCircle size={17} />
          <span>{comments}</span>
        </div>

      </div>

    </article>
  );
}