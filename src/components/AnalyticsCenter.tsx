import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";

export function AnalyticsCenter() {
  // Sample data for charts
  const dataVolumeData = [
    { date: "Jan 15", terra: 2400, aqua: 1800, landsat: 1200, sentinel: 3200 },
    { date: "Jan 16", terra: 2800, aqua: 2100, landsat: 1400, sentinel: 2900 },
    { date: "Jan 17", terra: 2200, aqua: 1900, landsat: 1600, sentinel: 3100 },
    { date: "Jan 18", terra: 3100, aqua: 2400, landsat: 1800, sentinel: 3400 },
    { date: "Jan 19", terra: 2900, aqua: 2200, landsat: 1500, sentinel: 3000 },
    { date: "Jan 20", terra: 3300, aqua: 2600, landsat: 2000, sentinel: 3600 },
    { date: "Jan 21", terra: 2700, aqua: 2000, landsat: 1700, sentinel: 3200 }
  ];

  const processingTimeData = [
    { hour: "00:00", time: 45 },
    { hour: "04:00", time: 38 },
    { hour: "08:00", time: 52 },
    { hour: "12:00", time: 48 },
    { hour: "16:00", time: 61 },
    { hour: "20:00", time: 43 }
  ];

  const dataTypeDistribution = [
    { name: "Ocean Color", value: 35, color: "#3b82f6" },
    { name: "Multispectral", value: 28, color: "#06b6d4" },
    { name: "Thermal", value: 20, color: "#10b981" },
    { name: "Radar", value: 12, color: "#f59e0b" },
    { name: "Other", value: 5, color: "#ef4444" }
  ];

  const satellitePerformance = [
    { satellite: "Terra", uptime: 98.5, dataVolume: 2.8, errors: 2 },
    { satellite: "Aqua", uptime: 97.2, dataVolume: 2.2, errors: 4 },
    { satellite: "Landsat-9", uptime: 85.0, dataVolume: 1.6, errors: 12 },
    { satellite: "Sentinel-2A", uptime: 96.8, dataVolume: 3.2, errors: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Center</h1>
            <p className="text-muted-foreground font-mono">
              Data insights and performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7d">
              <SelectTrigger className="w-32 bg-muted/20 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-primary/30 text-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="border-accent/30 text-accent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">TOTAL DATA VOLUME</p>
                <p className="text-3xl font-bold text-foreground">18.2TB</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% vs last week
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">AVG PROCESSING TIME</p>
                <p className="text-3xl font-bold text-foreground">47m</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  -8% improvement
                </p>
              </div>
              <Activity className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">SUCCESS RATE</p>
                <p className="text-3xl font-bold text-foreground">96.8%</p>
                <p className="text-xs text-success font-mono flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1% this month
                </p>
              </div>
              <PieChart className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">ACTIVE USERS</p>
                <p className="text-3xl font-bold text-foreground">247</p>
                <p className="text-xs text-warning font-mono flex items-center mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Peak: 14:30 UTC
                </p>
              </div>
              <Activity className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Data Volume Trends */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-5 h-5 text-primary" />
              Data Volume by Satellite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dataVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="terra" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="aqua" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                <Area type="monotone" dataKey="landsat" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="sentinel" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="w-5 h-5 text-primary" />
              Average Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Type Distribution */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="w-5 h-5 text-primary" />
              Data Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Pie
                  data={dataTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Satellite Performance */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-5 h-5 text-primary" />
              Satellite Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satellitePerformance.map((sat) => (
                <div key={sat.satellite} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{sat.satellite}</span>
                    <div className="flex gap-2">
                      <Badge className="bg-success/20 text-success border-success/30">
                        {sat.uptime}% uptime
                      </Badge>
                      {sat.errors > 10 ? (
                        <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                          {sat.errors} errors
                        </Badge>
                      ) : (
                        <Badge className="bg-warning/20 text-warning border-warning/30">
                          {sat.errors} errors
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground font-mono">
                      Data Volume: {sat.dataVolume}TB
                    </span>
                    <span className="text-muted-foreground font-mono">
                      Uptime: {sat.uptime}%
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