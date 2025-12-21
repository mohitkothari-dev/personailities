"use client";

import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem  } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { BotIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        title: "Conversations",
        href: "/conversations",
    },
    {
        icon: BotIcon,
        title: "Agents",
        href: "/agents",
    }
]

export const DashboardSidebar = () => {

    const pathname = usePathname();

    return (
        <Sidebar className="[background-image:var(--sidebar)]">
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <p className="text-2xl font-semibold">PersonAIlities</p>
                </Link>
            </SidebarHeader>
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]"></Separator>
                </div>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {
                                    firstSection.map((item) => (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                            asChild 
                                            className={cn("h-10 border border-transparent",pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}
                                            isActive={pathname === item.href}
                                            >
                                                <Link href={item.href}>
                                                <item.icon className="size-5" />
                                                <span className="text-sm font-medium tracking-tight">
                                                    {item.title}
                                                </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="text-white">
                    <DashboardUserButton />
                </SidebarFooter>
        </Sidebar>
    )
}
