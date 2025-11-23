/**
 * API Service Layer
 * 
 * This file contains all API calls to your backend.
 * Replace the mock implementations with actual API calls to your endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Types matching your ERD
export interface User {
  id: number;
  email: string;
  username: string;
  password?: string; // Never send to frontend in real implementation
}

export interface Post {
  id: number;
  title: string;
  description: string;
  author: number; // user id
  likes: number;
  created_at?: string;
}

export interface Comment {
  id: number;
  post_id: number;
  comment: string;
  author?: number; // Add if needed
  created_at?: string;
}

export interface Subreddit {
  id: number;
  name: string;
  description: string;
}

export interface SubredditUser {
  subreddit_id: number;
  user_id: number;
}

// User API
export const userApi = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async register(userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async getProfile(userId: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
  },
};

// Post API
export const postApi = {
  async getPosts(limit = 20, offset = 0): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&offset=${offset}`);
    return response.json();
  },

  async getPost(postId: number): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    return response.json();
  },

  async createPost(postData: Partial<Post>): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  async updateLikes(postId: number, increment: boolean): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ increment }),
    });
    return response.json();
  },

  async deletePost(postId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};

// Comment API
export const commentApi = {
  async getComments(postId: number): Promise<Comment[]> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.json();
  },

  async createComment(commentData: Partial<Comment>): Promise<Comment> {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(commentData),
    });
    return response.json();
  },

  async deleteComment(commentId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};

// Subreddit API
export const subredditApi = {
  async getSubreddits(): Promise<Subreddit[]> {
    const response = await fetch(`${API_BASE_URL}/subreddits`);
    return response.json();
  },

  async getSubreddit(subredditId: number): Promise<Subreddit> {
    const response = await fetch(`${API_BASE_URL}/subreddits/${subredditId}`);
    return response.json();
  },

  async createSubreddit(subredditData: Partial<Subreddit>): Promise<Subreddit> {
    const response = await fetch(`${API_BASE_URL}/subreddits`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(subredditData),
    });
    return response.json();
  },

  async joinSubreddit(subredditId: number, userId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/subreddits/${subredditId}/join`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });
  },

  async leaveSubreddit(subredditId: number, userId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/subreddits/${subredditId}/leave`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });
  },

  async getSubredditPosts(subredditId: number): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/subreddits/${subredditId}/posts`);
    return response.json();
  },
};
