import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar } from "../atoms/avatar";

export function CreatePostBox() {
  return (
    <div className="flex gap-3 border-b border-neutral-800 p-4">
      <Avatar size={40} />
      <div className="flex-1 space-y-3">
        <Textarea
          placeholder="What's happening?"
          className="bg-transparent border-neutral-800 focus-visible:ring-0 focus-visible:border-blue-500 text-white resize-none"
        />
        <div className="flex justify-end">
          <Button className="rounded-full px-6">Post</Button>
        </div>
      </div>
    </div>
  );
}