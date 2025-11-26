import { Heart, MessageCircle } from "lucide-react";

type Props = {
  username: string;
  handle: string;
  content: string;
  likes: number;
  comments: number;
};

function formatDate(date: Date) {
  return date.toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function PostCard({
  username,
  handle,
  content,
  likes,
  comments,
}: Props) {
  return (
    <article className="border-b border-[#1a1f2e] py-5 px-4 hover:bg-[#111627] transition-colors">
      
      {/* HEADER */}
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-600"></div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{username}</span>
            <span className="text-neutral-400">{handle}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-500">
              {formatDate(new Date())}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <p className="text-neutral-200 mt-3 mb-4 whitespace-pre-line">
        {content}
      </p>

      {/* FOOTER */}
      <footer className="flex items-center gap-6 text-neutral-400 text-sm">
        
        <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition">
          <Heart size={16} /> {likes}
        </div>

        <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition">
          <MessageCircle size={16} /> {comments}
        </div>
      </footer>

    </article>
  );
}