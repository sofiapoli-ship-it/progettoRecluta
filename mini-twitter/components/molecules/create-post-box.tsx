import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar } from "../atoms/avatar";

export function CreatePostBox() {
  return (
    <div className="flex gap-3 items-start bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
      <Avatar size={40} />
      <div className="flex-1 space-y-3">
        <Textarea
          placeholder="What's happening?"
          className="bg-neutral-800 border-neutral-700 text-white"
        />

        <div className="flex justify-end">
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
}