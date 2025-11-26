import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "../atoms/avatar";

export function PostCard({ username, handle, content, time, likes, comments }: any) {
  return (
    <Card className="bg-black border-b border-neutral-800 rounded-none">
      <CardContent className="p-4 space-y-3">
        <div className="flex gap-3">
          <Avatar size={42} />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{username}</span>
              <span className="text-neutral-500">@{handle}</span>
              <span className="text-neutral-500">· {time}</span>
            </div>

            <p className="text-neutral-200">{content}</p>

            <div className="flex gap-6 text-neutral-500 text-sm pt-3">
              <button>❤️ {likes}</button>
              <button>💬 {comments}</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}