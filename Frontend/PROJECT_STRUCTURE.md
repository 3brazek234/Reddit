# Reddit Clone - Frontend Project Structure

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   │   └── Header.tsx  # Main navigation header
│   ├── post/           # Post-related components
│   │   └── PostCard.tsx # Individual post card with voting
│   ├── comment/        # Comment-related components
│   │   └── CommentItem.tsx # Individual comment with voting
│   ├── subreddit/      # Subreddit-related components
│   │   └── SubredditCard.tsx # Subreddit preview card
│   └── ui/             # shadcn/ui components (pre-built)
│
├── pages/              # Page components (routes)
│   ├── Home.tsx        # Main feed page
│   ├── PostDetail.tsx  # Individual post view with comments
│   ├── SubredditView.tsx # Subreddit page
│   └── NotFound.tsx    # 404 page
│
├── services/           # API integration layer
│   └── api.ts          # All API endpoints (users, posts, comments, subreddits)
│
├── types/              # TypeScript type definitions
│   └── index.ts        # Types matching your ERD schema
│
├── hooks/              # Custom React hooks
│   └── use-toast.ts    # Toast notification hook
│
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions (cn, etc.)
│
├── App.tsx             # Main app component with routing
├── main.tsx            # App entry point
└── index.css           # Global styles & design system
```

## 🎨 Design System

All colors, spacing, and styles are defined in:
- `src/index.css` - CSS variables (HSL colors only)
- `tailwind.config.ts` - Tailwind theme configuration

Key color tokens:
- `--primary` - Orange/coral (#FF5722 inspired)
- `--upvote` - Orange for upvote interactions
- `--downvote` - Blue for downvote interactions
- `--background` - Light gray background
- `--card` - White cards with subtle shadows

## 📄 Pages & Components

### Home Page (`/`)
**Components used:**
- `Header` - Top navigation
- `PostCard` - Individual posts with voting
- `SubredditCard` - Trending communities
- `Tabs` - Hot/New/Top sorting

**Features:**
- Post feed with voting
- Filter by Hot/New/Top
- Trending subreddits sidebar
- Create post button

### Post Detail Page (`/post/:id`)
**Components used:**
- `Header`
- `PostCard` - Full post view
- `CommentItem` - Individual comments
- `Textarea` - Comment input

**Features:**
- Full post content
- Comment thread
- Nested comment replies
- Vote on post and comments

### Subreddit Page (`/r/:subreddit`)
**Components used:**
- `Header`
- `PostCard` - Subreddit posts
- `Card` - Community info sidebar

**Features:**
- Subreddit header with description
- Join/Leave button
- Filtered posts from that community
- Community rules sidebar

## 🔌 API Integration

### Service Layer (`src/services/api.ts`)

All API calls are organized by entity:

#### User API
```typescript
userApi.login(email, password)        // POST /api/auth/login
userApi.register(userData)            // POST /api/auth/register
userApi.getProfile(userId)            // GET /api/users/:id
```

#### Post API
```typescript
postApi.getPosts(limit, offset)       // GET /api/posts
postApi.getPost(postId)               // GET /api/posts/:id
postApi.createPost(postData)          // POST /api/posts
postApi.updateLikes(postId, increment) // PATCH /api/posts/:id/like
postApi.deletePost(postId)            // DELETE /api/posts/:id
```

#### Comment API
```typescript
commentApi.getComments(postId)        // GET /api/posts/:id/comments
commentApi.createComment(commentData) // POST /api/comments
commentApi.deleteComment(commentId)   // DELETE /api/comments/:id
```

#### Subreddit API
```typescript
subredditApi.getSubreddits()          // GET /api/subreddits
subredditApi.getSubreddit(id)         // GET /api/subreddits/:id
subredditApi.createSubreddit(data)    // POST /api/subreddits
subredditApi.joinSubreddit(id, userId) // POST /api/subreddits/:id/join
subredditApi.leaveSubreddit(id, userId) // DELETE /api/subreddits/:id/leave
subredditApi.getSubredditPosts(id)    // GET /api/subreddits/:id/posts
```

### Environment Variables

Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Authentication Flow

1. User logs in via `userApi.login()`
2. Token is stored in `localStorage`
3. Token is included in all authenticated requests via `Authorization: Bearer ${token}` header
4. Token is cleared on logout

## 📊 Data Flow

### ERD to Frontend Mapping

```
ERD Table → TypeScript Type → API Service → React Component
────────────────────────────────────────────────────────────
user       → User           → userApi      → Header, PostCard
post       → Post           → postApi      → PostCard, PostDetail
comment    → Comment        → commentApi   → CommentItem
subreddit  → Subreddit      → subredditApi → SubredditCard, SubredditView
```

## 🎯 Key Features Implemented

✅ **Post Voting System**
- Upvote/downvote with visual feedback
- Like count updates
- Vote state management

✅ **Comment System**
- Display comments
- Reply to comments
- Vote on comments

✅ **Subreddit System**
- Browse communities
- Join/leave subreddits
- View subreddit-specific posts

✅ **Responsive Design**
- Mobile-first approach
- Responsive navigation
- Collapsible sidebars

## 🔧 How to Connect Your Backend

1. **Update API Base URL**
   - Set `VITE_API_BASE_URL` in `.env`

2. **Replace Mock Data**
   - In each page component, replace mock data with API calls
   - Use React Query for data fetching:
   ```typescript
   import { useQuery } from '@tanstack/react-query';
   import { postApi } from '@/services/api';
   
   const { data: posts } = useQuery({
     queryKey: ['posts'],
     queryFn: () => postApi.getPosts()
   });
   ```

3. **Add Authentication**
   - Implement login/signup pages
   - Use Context API or Redux for auth state
   - Add protected routes

4. **Handle Loading & Errors**
   - Add loading skeletons
   - Add error boundaries
   - Show toast notifications

## 🚀 Next Steps

1. **Authentication Pages**
   - Create `/login` and `/signup` pages
   - Implement auth context
   - Add protected routes

2. **Real-time Features**
   - WebSocket for live updates
   - Real-time comment updates
   - Live vote counts

3. **Enhanced Features**
   - Image uploads for posts
   - Markdown support
   - User profiles
   - Search functionality
   - Notifications

4. **Performance**
   - Implement pagination
   - Add infinite scroll
   - Optimize images
   - Add caching

## 📝 Component Props Reference

### PostCard
```typescript
interface PostCardProps {
  id: number;
  title: string;
  description: string;
  author: string;
  likes: number;
  commentCount?: number;
  subreddit?: string;
  createdAt?: string;
}
```

### CommentItem
```typescript
interface CommentItemProps {
  id: number;
  author: string;
  content: string;
  likes?: number;
  createdAt?: string;
  depth?: number;
}
```

### SubredditCard
```typescript
interface SubredditCardProps {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}
```

## 🎨 Styling Guidelines

- **Use semantic tokens** from design system (never hardcode colors)
- **Component variants** defined in shadcn components
- **Animations** use CSS transitions with `--transition-smooth`
- **Responsive** breakpoints: sm (640px), md (768px), lg (1024px)

## 📚 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Lucide React** - Icons
