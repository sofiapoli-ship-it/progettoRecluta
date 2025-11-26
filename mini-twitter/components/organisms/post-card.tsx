import { Card, CardContent } from "@/components/ui/card";
import { UserRow } from "../molecules/user-row";

export function PostCard({
  username,
  content,
  likes,
  comments,
}: {
  username: string;
  content: string;
  likes: number;
  comments: number;
}) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-4 space-y-3">
        
        <UserRow username={username} />

        <p className="text-neutral-100">{content}</p>

        <div className="flex gap-4 text-neutral-400 text-sm pt-1">
          <button>❤️ {likes}</button>
          <button>💬 {comments}</button>
        </div>
      </CardContent>
    </Card>
  );
}