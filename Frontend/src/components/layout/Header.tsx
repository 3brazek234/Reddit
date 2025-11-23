import { Search, Plus, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-14 items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">R</span>
          </div>
          <span className="hidden font-bold text-foreground sm:inline-block">
            Reddit Clone
          </span>
        </Link>

        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts, communities..."
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Post</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
