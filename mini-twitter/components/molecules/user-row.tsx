import { Avatar } from "../atoms/avatar";

export function UserRow({ username }: { username: string }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar size={36} />
      <span className="text-sm font-semibold">@{username}</span>
    </div>
  );
}