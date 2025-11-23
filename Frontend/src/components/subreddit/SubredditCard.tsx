import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

interface SubredditCardProps {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

export const SubredditCard = ({ id, name, description, memberCount }: SubredditCardProps) => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <Card className="p-4 hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/r/${name}`} className="flex-1">
          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
            r/{name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </Link>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{memberCount.toLocaleString()} members</span>
        </div>
        <Button
          size="sm"
          variant={isJoined ? "secondary" : "default"}
          onClick={() => setIsJoined(!isJoined)}
        >
          {isJoined ? "Joined" : "Join"}
        </Button>
      </div>
    </Card>
  );
};
