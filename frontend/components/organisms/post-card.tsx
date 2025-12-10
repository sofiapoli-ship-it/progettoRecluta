import { Heart, MessageCircle } from "lucide-react";

type Props = {
  username: string;
  handle: string;
  time: string | Date;
  content: string;
  likes: number;
  comments: number;
};

export function PostCard({ username, handle, time, content, likes, comments }: Props) {

  const date = new Date(time);
  const formatted = date.toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-4 border-b border-[#1E2535]">

      <div className="flex items-start gap-3">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
          {username[0].toUpperCase()}
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-[14px]">{handle}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/40 text-[12px]">{formatted}</span>
          </div>

          <p className="text-white text-[15px] mt-2 mb-3">
            {content}
          </p>

          <div className="flex items-center gap-6 text-white/40 text-[14px]">
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <span>{likes}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>{comments}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}