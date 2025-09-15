import { Satellite, Database, Map, Activity, BarChart3, Upload, Home, Settings, Users, Shield } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Satellite Tracking", url: "/tracking", icon: Satellite },
  { title: "Data Browser", url: "/data", icon: Database },
  { title: "Processing Pipeline", url: "/pipeline", icon: Activity },
  { title: "Analytics Center", url: "/analytics", icon: BarChart3 },
  { title: "File Upload", url: "/upload", icon: Upload },
];

const systemNavItems = [
  { title: "User Management", url: "/users", icon: Users },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary font-medium shadow-glow" 
      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-smooth";

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent className="bg-gradient-space border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Satellite className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-foreground">SatPipe</h2>
              <p className="text-xs text-muted-foreground font-mono">v2.4.1</p>
            </div>
          </div>
        </div>

        {/* Mission Control */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-mono tracking-wider text-primary">
            MISSION CONTROL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Administration */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-mono tracking-wider text-accent">
            SYSTEM ADMIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-glow"></div>
            <span className="text-muted-foreground font-mono">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono mt-1">
            Uptime: 47d 23h 15m
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}