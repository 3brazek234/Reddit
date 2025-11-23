import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/post/PostCard";
import { SubredditCard } from "@/components/subreddit/SubredditCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Sparkles } from "lucide-react";

// Mock data - replace with API calls
const mockPosts = [
  {
    id: 1,
    title: "Welcome to our Reddit-style community platform!",
    description: "This is a sample post showcasing the design. You can upvote, downvote, comment, and share posts. The backend is ready to be integrated with your API endpoints.",
    author: "admin",
    likes: 42,
    commentCount: 12,
    subreddit: "announcements",
    createdAt: "2h ago",
  },
  {
    id: 2,
    title: "How to integrate this frontend with your backend API",
    description: "Check out the API services folder for examples on how to connect to your gRPC or REST endpoints. All components are ready to consume your data.",
    author: "developer",
    likes: 28,
    commentCount: 8,
    subreddit: "help",
    createdAt: "4h ago",
  },
  {
    id: 3,
    title: "Amazing features coming soon!",
    description: "We're working on real-time notifications, image uploads, markdown support, and much more. Stay tuned for updates!",
    author: "moderator",
    likes: 156,
    commentCount: 34,
    subreddit: "general",
    createdAt: "6h ago",
  },
];

const trendingSubreddits = [
  { id: 1, name: "programming", description: "All things programming and development", memberCount: 15420 },
  { id: 2, name: "gaming", description: "Gaming news, discussions and memes", memberCount: 28350 },
  { id: 3, name: "technology", description: "Latest tech news and gadgets", memberCount: 42180 },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="hot" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="hot" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Hot
                </TabsTrigger>
                <TabsTrigger value="new" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  New
                </TabsTrigger>
                <TabsTrigger value="top" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Top
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {mockPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Posts
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h2 className="text-lg font-semibold mb-4">Trending Communities</h2>
              <div className="space-y-3">
                {trendingSubreddits.map((subreddit) => (
                  <SubredditCard key={subreddit.id} {...subreddit} />
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-muted-foreground mb-4">
                A modern Reddit-style community platform built with React, ready to integrate with your backend API.
              </p>
              <Button className="w-full">Create Community</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
