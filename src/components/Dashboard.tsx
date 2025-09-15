import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Satellite, 
  Activity, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import satelliteHero from "@/assets/satellite-hero.jpg";

export function Dashboard() {
  // Sample data
  const satellites = [
    { id: "SAT-001", name: "Terra Observatory", status: "operational", signal: 98, lastContact: "2 min ago" },
    { id: "SAT-002", name: "Aqua Research", status: "operational", signal: 94, lastContact: "5 min ago" },
    { id: "SAT-003", name: "Landsat-9", status: "maintenance", signal: 0, lastContact: "2 hours ago" },
    { id: "SAT-004", name: "Sentinel-2A", status: "operational", signal: 89, lastContact: "1 min ago" },
    { id: "SAT-005", name: "MODIS Alpha", status: "warning", signal: 76, lastContact: "15 min ago" },
  ];

  const processingJobs = [
    { id: "JOB-001", type: "Image Processing", progress: 87, eta: "5 min", priority: "high" },
    { id: "JOB-002", type: "Data Compression", progress: 45, eta: "12 min", priority: "medium" },
    { id: "JOB-003", type: "Quality Check", progress: 100, eta: "Complete", priority: "low" },
    { id: "JOB-004", type: "Calibration", progress: 23, eta: "18 min", priority: "high" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational": 
        return <Badge className="bg-success/20 text-success border-success/30">Operational</Badge>;
      case "maintenance":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Maintenance</Badge>;
      case "warning":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Warning</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg mb-6">
        <div 
          className="h-48 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${satelliteHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent"></div>
          <div className="relative p-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Satellite Data Pipeline
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Real-time monitoring and management system
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Button variant="default" className="bg-gradient-primary shadow-glow">
                <Activity className="w-4 h-4 mr-2" />
                Live Status
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">ACTIVE SATELLITES</p>
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2 this month
                </p>
              </div>
              <Satellite className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">DATA PROCESSED</p>
                <p className="text-3xl font-bold text-foreground">2.4TB</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% today
                </p>
              </div>
              <Database className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">PROCESSING JOBS</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-warning font-mono flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  4 in queue
                </p>
              </div>
              <Zap className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">SYSTEM HEALTH</p>
                <p className="text-3xl font-bold text-success">98%</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All systems go
                </p>
              </div>
              <Activity className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satellite Status */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Satellite className="w-5 h-5 text-primary" />
              Satellite Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satellites.map((sat) => (
                <div key={sat.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{sat.id}</span>
                      <span className="font-medium text-foreground">{sat.name}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      {getStatusBadge(sat.status)}
                      {sat.signal > 0 && (
                        <span className="text-xs font-mono text-muted-foreground">
                          Signal: {sat.signal}%
                        </span>
                      )}
                      <span className="text-xs font-mono text-muted-foreground">
                        Last: {sat.lastContact}
                      </span>
                    </div>
                  </div>
                  {sat.status === "operational" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : sat.status === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Processing Jobs */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="w-5 h-5 text-primary" />
              Active Processing Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingJobs.map((job) => (
                <div key={job.id} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{job.id}</span>
                      <span className="font-medium text-foreground">{job.type}</span>
                    </div>
                    <span className={`text-xs font-mono uppercase ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={job.progress} className="flex-1 h-2" />
                    <span className="text-sm font-mono text-muted-foreground min-w-0 flex-shrink-0">
                      {job.progress}%
                    </span>
                    <span className="text-xs font-mono text-muted-foreground min-w-0 flex-shrink-0">
                      ETA: {job.eta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}