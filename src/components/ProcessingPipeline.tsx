import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Play, 
  Pause, 
  StopCircle, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Zap,
  Database,
  Settings,
  RotateCcw
} from "lucide-react";

export function ProcessingPipeline() {
  const [selectedPipeline, setSelectedPipeline] = useState("PIPELINE-001");

  // Sample pipeline data
  const pipelines = [
    {
      id: "PIPELINE-001",
      name: "Ocean Color Processing",
      status: "running",
      progress: 67,
      eta: "8 min",
      priority: "high",
      startTime: "14:23:15 UTC",
      steps: [
        { name: "Data Ingestion", status: "completed", duration: "2.3s" },
        { name: "Quality Check", status: "completed", duration: "5.7s" },
        { name: "Atmospheric Correction", status: "running", duration: "45.2s" },
        { name: "Calibration", status: "pending", duration: "-" },
        { name: "Product Generation", status: "pending", duration: "-" },
        { name: "Quality Validation", status: "pending", duration: "-" }
      ]
    },
    {
      id: "PIPELINE-002",
      name: "Multispectral Analysis",
      status: "queued", 
      progress: 0,
      eta: "15 min",
      priority: "medium",
      startTime: "Queued",
      steps: [
        { name: "Data Loading", status: "pending", duration: "-" },
        { name: "Band Registration", status: "pending", duration: "-" },
        { name: "Radiometric Correction", status: "pending", duration: "-" },
        { name: "Geometric Correction", status: "pending", duration: "-" },
        { name: "Classification", status: "pending", duration: "-" },
        { name: "Export", status: "pending", duration: "-" }
      ]
    },
    {
      id: "PIPELINE-003",
      name: "Cloud Detection",
      status: "completed",
      progress: 100,
      eta: "Completed",
      priority: "low",
      startTime: "13:45:22 UTC",
      steps: [
        { name: "Image Preprocessing", status: "completed", duration: "3.1s" },
        { name: "Feature Extraction", status: "completed", duration: "12.4s" },
        { name: "ML Classification", status: "completed", duration: "28.7s" },
        { name: "Post-processing", status: "completed", duration: "4.2s" },
        { name: "Mask Generation", status: "completed", duration: "1.8s" },
        { name: "Validation", status: "completed", duration: "2.3s" }
      ]
    },
    {
      id: "PIPELINE-004",
      name: "Fire Detection Alert",
      status: "failed",
      progress: 45,
      eta: "Failed",
      priority: "high", 
      startTime: "12:15:08 UTC",
      steps: [
        { name: "Thermal Band Analysis", status: "completed", duration: "5.2s" },
        { name: "Hotspot Detection", status: "completed", duration: "8.9s" },
        { name: "False Positive Filter", status: "failed", duration: "-" },
        { name: "Alert Generation", status: "pending", duration: "-" },
        { name: "Notification", status: "pending", duration: "-" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">Running</Badge>;
      case "completed":
        return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case "queued":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Queued</Badge>;
      case "failed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Failed</Badge>;
      case "paused":
        return <Badge className="bg-muted/20 text-muted-foreground border-muted/30">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "running":
        return <Activity className="w-4 h-4 text-primary animate-pulse" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const currentPipeline = pipelines.find(p => p.id === selectedPipeline) || pipelines[0];

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Processing Pipeline</h1>
        <p className="text-muted-foreground font-mono">
          Monitor and manage data processing workflows
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline List */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="w-5 h-5 text-primary" />
              Active Pipelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                    selectedPipeline === pipeline.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border/30 bg-muted/20 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPipeline(pipeline.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{pipeline.id}</div>
                      <div className="font-medium text-sm text-foreground">{pipeline.name}</div>
                    </div>
                    {getStatusBadge(pipeline.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">Progress</span>
                      <span className="text-xs font-mono text-foreground">{pipeline.progress}%</span>
                    </div>
                    <Progress value={pipeline.progress} className="h-1" />
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono uppercase ${getPriorityColor(pipeline.priority)}`}>
                        {pipeline.priority}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        ETA: {pipeline.eta}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Details */}
        <Card className="lg:col-span-2 bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Zap className="w-5 h-5 text-primary" />
                Pipeline Details
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-success/30 text-success">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-warning/30 text-warning">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-destructive/30 text-destructive">
                  <StopCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-accent/30 text-accent">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Pipeline Overview */}
            <div className="mb-6 p-4 bg-muted/20 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Pipeline ID</div>
                  <div className="font-mono text-sm text-foreground">{currentPipeline.id}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Status</div>
                  <div className="mt-1">{getStatusBadge(currentPipeline.status)}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Started</div>
                  <div className="font-mono text-sm text-foreground">{currentPipeline.startTime}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Priority</div>
                  <div className={`font-mono text-sm uppercase ${getPriorityColor(currentPipeline.priority)}`}>
                    {currentPipeline.priority}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-mono text-foreground">{currentPipeline.progress}%</span>
                </div>
                <Progress value={currentPipeline.progress} className="h-3" />
              </div>
            </div>

            {/* Processing Steps */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Processing Steps
              </h3>
              
              <div className="space-y-3">
                {currentPipeline.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/10 rounded-lg">
                    <div className="flex-shrink-0">
                      {getStepIcon(step.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-foreground">{step.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {step.status === "completed" && (
                        <Badge variant="outline" className="border-success/30 text-success">
                          Done
                        </Badge>
                      )}
                      {step.status === "running" && (
                        <Badge variant="outline" className="border-primary/30 text-primary animate-pulse">
                          Active
                        </Badge>
                      )}
                      {step.status === "failed" && (
                        <Badge variant="outline" className="border-destructive/30 text-destructive">
                          Error
                        </Badge>
                      )}
                      {step.status === "pending" && (
                        <Badge variant="outline" className="border-muted/30 text-muted-foreground">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Actions */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-primary/30 text-primary">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="border-accent/30 text-accent">
                  <Database className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}