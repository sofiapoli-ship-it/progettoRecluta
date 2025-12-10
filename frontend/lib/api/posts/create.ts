// lib/api/posts/create.ts

import { apiFetch } from "../../api";

export type CreatePostResponse = {
  success: boolean;
  post: {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
  };
};

export async function createPost(
  token: string,
  content: string
): Promise<CreatePostResponse> {
  return apiFetch<CreatePostResponse>("/posts", {
    method: "POST",
    token,
    body: { content },
  });
}