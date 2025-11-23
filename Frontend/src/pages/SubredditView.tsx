import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import { useState } from "react";

// Mock data
const subredditInfo = {
  name: "programming",
  description: "A community for all things programming and development. Share your projects, ask questions, and learn from others.",
  memberCount: 15420,
  createdAt: "Jan 2023",
};

const subredditPosts = [
  {
    id: 1,
    title: "Best practices for React component architecture",
    description: "I've been working on a large React application and wanted to share some patterns that have worked well for our team...",
    author: "developer1",
    likes: 234,
    commentCount: 45,
    subreddit: "programming",
    createdAt: "3h ago",
  },
  {
    id: 2,
    title: "My first TypeScript project!",
    description: "After months of learning, I finally built something I'm proud of. Here's what I learned along the way...",
    author: "newbie_dev",
    likes: 128,
    commentCount: 23,
    subreddit: "programming",
    createdAt: "5h ago",
  },
];

const SubredditView = () => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Subreddit Header */}
      <div className="border-b bg-card">
        <div className="container px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">r/{subredditInfo.name}</h1>
              <p className="text-muted-foreground max-w-2xl">
                {subredditInfo.description}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{subredditInfo.memberCount.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {subredditInfo.createdAt}</span>
                </div>
              </div>
            </div>
            <Button
              variant={isJoined ? "secondary" : "default"}
              size="lg"
              onClick={() => setIsJoined(!isJoined)}
            >
              {isJoined ? "Joined" : "Join Community"}
            </Button>
          </div>
        </div>
      </div>

      <main className="container px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-4">
            {subredditPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">About Community</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {subredditInfo.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-semibold">{subredditInfo.memberCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-semibold">{subredditInfo.createdAt}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Community Rules</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Be respectful and civil</li>
                <li>No spam or self-promotion</li>
                <li>Stay on topic</li>
                <li>Follow Reddit's content policy</li>
              </ol>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubredditView;
