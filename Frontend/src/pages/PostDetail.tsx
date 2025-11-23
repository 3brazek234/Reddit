import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/post/PostCard";
import { CommentItem } from "@/components/comment/CommentItem";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockPost = {
  id: 1,
  title: "Welcome to our Reddit-style community platform!",
  description: "This is a detailed post view. Here you can see the full content of the post along with all comments. The voting system works on both posts and comments. Feel free to explore the interactions!",
  author: "admin",
  likes: 42,
  commentCount: 5,
  subreddit: "announcements",
  createdAt: "2h ago",
};

const mockComments = [
  {
    id: 1,
    author: "user1",
    content: "Great work on this platform! Looking forward to seeing it with real data.",
    likes: 12,
    createdAt: "1h ago",
  },
  {
    id: 2,
    author: "developer",
    content: "The API integration is straightforward. Check the services folder for examples.",
    likes: 8,
    createdAt: "45m ago",
  },
  {
    id: 3,
    author: "user2",
    content: "Love the clean design and smooth interactions. The voting animations are nice!",
    likes: 15,
    createdAt: "30m ago",
  },
];

const PostDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6 max-w-5xl">
        <Link to="/">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Button>
        </Link>

        <div className="space-y-4">
          <PostCard {...mockPost} />

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Comment as u/username</h3>
            <Textarea
              placeholder="What are your thoughts?"
              className="mb-3 min-h-24"
            />
            <div className="flex justify-end">
              <Button>Comment</Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Comments ({mockComments.length})
              </h3>
            </div>
            
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
