/**
 * Type definitions matching your ERD schema
 */

export interface User {
  id: number;
  email: string;
  username: string;
  created_at?: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  author: number; // references user.id
  likes: number;
  created_at?: string;
  updated_at?: string;
  // Joined fields (not in ERD but useful for frontend)
  author_username?: string;
  comment_count?: number;
  subreddit_name?: string;
}

export interface Comment {
  id: number;
  post_id: number; // references post.id
  comment: string;
  created_at?: string;
  // Joined fields
  author_id?: number;
  author_username?: string;
}

export interface Subreddit {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  // Joined fields
  member_count?: number;
  is_member?: boolean;
}

export interface SubredditUser {
  subreddit_id: number; // references subreddit.id
  user_id: number; // references user.id
  joined_at?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
