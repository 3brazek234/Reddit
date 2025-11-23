import { ArrowBigUp, ArrowBigDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CommentItemProps {
  id: number;
  author: string;
  content: string;
  likes?: number;
  createdAt?: string;
  depth?: number;
}

export const CommentItem = ({
  author,
  content,
  likes = 0,
  createdAt = "1h ago",
  depth = 0,
}: CommentItemProps) => {
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showReply, setShowReply] = useState(false);

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
    <div className={cn("flex gap-2", depth > 0 && "ml-4 border-l-2 border-border pl-4")}>
      <div className="flex flex-col items-center gap-1 pt-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 hover:bg-upvote/10 hover:text-upvote",
            voteState === "up" && "text-upvote bg-upvote/10"
          )}
          onClick={() => handleVote("up")}
        >
          <ArrowBigUp className="h-4 w-4" fill={voteState === "up" ? "currentColor" : "none"} />
        </Button>
        <span className={cn(
          "text-xs font-semibold",
          voteState === "up" && "text-upvote",
          voteState === "down" && "text-downvote"
        )}>
          {currentLikes}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 hover:bg-downvote/10 hover:text-downvote",
            voteState === "down" && "text-downvote bg-downvote/10"
          )}
          onClick={() => handleVote("down")}
        >
          <ArrowBigDown className="h-4 w-4" fill={voteState === "down" ? "currentColor" : "none"} />
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">u/{author}</span>
          <span>•</span>
          <span>{createdAt}</span>
        </div>
        
        <p className="text-sm mb-2">{content}</p>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 gap-1 text-xs"
            onClick={() => setShowReply(!showReply)}
          >
            <MessageSquare className="h-3 w-3" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
