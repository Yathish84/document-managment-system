"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Users,
  MessageSquareText,
  BarChart3,
  Menu,
  LogOut,
  Shield,
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth, useHasRole } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";

export default function DashboardNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAdmin = useHasRole("admin");
  const isEditor = useHasRole(["admin", "editor"]);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const getRoleBadge = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return (
          <Badge className="ml-2 bg-teal-600">
            <Shield className="mr-1 h-3 w-3" /> Admin
          </Badge>
        );
      case "editor":
        return (
          <Badge className="ml-2 bg-blue-500">
            <Pencil className="mr-1 h-3 w-3" /> Editor
          </Badge>
        );
      case "viewer":
        return (
          <Badge variant="outline" className="ml-2">
            <Eye className="mr-1 h-3 w-3" /> Viewer
          </Badge>
        );
      default:
        return null;
    }
  };

  // Define nav items based on user role
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["admin", "editor", "viewer"], // All roles can access
    },
    {
      name: "Documents",
      href: "/documents",
      icon: <FileText className="h-5 w-5" />,
      roles: ["admin", "editor", "viewer"], // All roles can access
    },
    {
      name: "Ingestion",
      href: "/ingestion",
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["admin", "editor"], // Only admin and editor can access
    },
    {
      name: "Q&A",
      href: "/qa",
      icon: <MessageSquareText className="h-5 w-5" />,
      roles: ["admin", "editor", "viewer"], // All roles can access
    },
  ];

  // Add Users nav item only for admin
  if (isAdmin) {
    navItems.push({
      name: "Users",
      href: "/users",
      icon: <Users className="h-5 w-5" />,
      roles: ["admin"], // Only admin can access
    });
  }

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className=" flex h-16 items-center px-4 sm:px-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-4 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b py-4">
                <FileText className="h-6 w-6 text-teal-600" />
                <span className="font-bold text-xl">DocuQuery</span>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <div className="grid gap-1">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-muted font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="border-t py-4">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 mt-2"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-xl"
        >
          <FileText className="h-6 w-6 text-teal-600" />
          <span>DocuQuery</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 ml-10">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 bg-teal-600 cursor-pointer" >
                <AvatarImage
              
                //   src={user?.avatar || "/placeholder.svg"}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="text-white ">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                {getRoleBadge()}
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
