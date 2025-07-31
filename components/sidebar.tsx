"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Home, Menu, Settings, Users, X } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && <h1 className="text-xl font-bold">SLC Calendar</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={isCollapsed ? "mx-auto" : ""}
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>
      <nav className="p-2">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-${isCollapsed ? "center" : "start"}`}
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-${isCollapsed ? "center" : "start"}`}
              asChild
            >
              <Link href="/">
                <Calendar className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>Calendar</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-${isCollapsed ? "center" : "start"}`}
              asChild
            >
              <Link href="/">
                <Clock className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>Schedule</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-${isCollapsed ? "center" : "start"}`}
              asChild
            >
              <Link href="/">
                <Users className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>Team</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-${isCollapsed ? "center" : "start"}`}
              asChild
            >
              <Link href="/">
                <Settings className="w-5 h-5 mr-2" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
