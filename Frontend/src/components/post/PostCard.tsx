import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

export const PostCard = ({
  id,
  title,
  description,
  author,
  likes,
  commentCount = 0,
  subreddit = "general",
  createdAt = "2h ago",
}: PostCardProps) => {
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleVote = (type: "up" | "down") => {
    if (voteState === type) {
      setVoteState(null);
      setCurrentLikes(likes);
    } else {
      const previousVote = voteState;
      setVoteState(type);
      
      let newLikes = likes;
      if (previousVote === "up") newLikes -= 1;
      if (previousVote === "down") newLikes += 1;
      
      if (type === "up") newLikes += 1;
      if (type === "down") newLikes -= 1;
      
      setCurrentLikes(newLikes);
    }
  };

  return (
    <Card className="overflow-hidden hover:border-primary/20 transition-all">
      <div className="flex gap-2 p-3">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 hover:bg-upvote/10 hover:text-upvote",
              voteState === "up" && "text-upvote bg-upvote/10"
            )}
            onClick={() => handleVote("up")}
          >
            <ArrowBigUp className="h-5 w-5" fill={voteState === "up" ? "currentColor" : "none"} />
          </Button>
          <span className={cn(
            "text-sm font-semibold",
            voteState === "up" && "text-upvote",
            voteState === "down" && "text-downvote"
          )}>
            {currentLikes}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 hover:bg-downvote/10 hover:text-downvote",
              voteState === "down" && "text-downvote bg-downvote/10"
            )}
            onClick={() => handleVote("down")}
          >
            <ArrowBigDown className="h-5 w-5" fill={voteState === "down" ? "currentColor" : "none"} />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link 
              to={`/r/${subreddit}`}
              className="font-semibold hover:underline text-foreground"
            >
              r/{subreddit}
            </Link>
            <span>•</span>
            <span>Posted by u/{author}</span>
            <span>•</span>
            <span>{createdAt}</span>
          </div>

          <Link to={`/post/${id}`}>
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {description}
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <Link to={`/post/${id}`}>
              <Button variant="ghost" size="sm" className="gap-2 h-8">
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount} Comments</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
