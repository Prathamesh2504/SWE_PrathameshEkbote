import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Satellite, 
  Globe, 
  Navigation, 
  Signal, 
  Clock,
  MapPin,
  Orbit,
  Activity
} from "lucide-react";
import satelliteNetwork from "@/assets/satellite-network.jpg";

export function SatelliteTracking() {
  const [selectedSatellite, setSelectedSatellite] = useState("SAT-001");

  // Sample satellite data
  const satellites = [
    {
      id: "SAT-001",
      name: "Terra Observatory",
      status: "operational",
      altitude: "705 km",
      inclination: "98.2°",
      period: "98.8 min",
      nextPass: "14:23 UTC",
      signal: 98,
      latitude: 34.0522,
      longitude: -118.2437,
      velocity: "7.5 km/s",
      groundTrack: "Los Angeles, CA"
    },
    {
      id: "SAT-002", 
      name: "Aqua Research",
      status: "operational",
      altitude: "705 km", 
      inclination: "98.2°",
      period: "98.8 min",
      nextPass: "15:47 UTC",
      signal: 94,
      latitude: 51.5074,
      longitude: -0.1278,
      velocity: "7.5 km/s",
      groundTrack: "London, UK"
    },
    {
      id: "SAT-003",
      name: "Landsat-9",
      status: "maintenance",
      altitude: "705 km",
      inclination: "98.2°", 
      period: "99.0 min",
      nextPass: "N/A",
      signal: 0,
      latitude: 0,
      longitude: 0,
      velocity: "0 km/s",
      groundTrack: "Maintenance Mode"
    },
    {
      id: "SAT-004",
      name: "Sentinel-2A", 
      status: "operational",
      altitude: "786 km",
      inclination: "98.6°",
      period: "100.6 min",
      nextPass: "16:12 UTC",
      signal: 89,
      latitude: 48.8566,
      longitude: 2.3522,
      velocity: "7.4 km/s",
      groundTrack: "Paris, France"
    },
    {
      id: "SAT-005",
      name: "MODIS Alpha",
      status: "warning",
      altitude: "705 km",
      inclination: "98.2°",
      period: "98.9 min", 
      nextPass: "17:35 UTC",
      signal: 76,
      latitude: 35.6762,
      longitude: 139.6503,
      velocity: "7.5 km/s",
      groundTrack: "Tokyo, Japan"
    }
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

  const currentSatellite = satellites.find(sat => sat.id === selectedSatellite) || satellites[0];

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Satellite Tracking</h1>
        <p className="text-muted-foreground font-mono">
          Real-time orbital positioning and status monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satellite List */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Satellite className="w-5 h-5 text-primary" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {satellites.map((satellite) => (
                <div
                  key={satellite.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                    selectedSatellite === satellite.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border/30 bg-muted/20 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedSatellite(satellite.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{satellite.id}</div>
                      <div className="font-medium text-sm text-foreground">{satellite.name}</div>
                    </div>
                    {getStatusBadge(satellite.status)}
                  </div>
                  
                  {satellite.status === "operational" && (
                    <div className="flex items-center gap-2">
                      <Signal className="w-3 h-3 text-primary" />
                      <Progress value={satellite.signal} className="flex-1 h-1" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {satellite.signal}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Globe className="w-5 h-5 text-primary" />
              Global Tracking Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Map placeholder with satellite network image */}
              <div 
                className="h-80 bg-cover bg-center rounded-lg border border-border/30 relative overflow-hidden"
                style={{ backgroundImage: `url(${satelliteNetwork})` }}
              >
                <div className="absolute inset-0 bg-background/20"></div>
                
                {/* Satellite positions (simulated) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {satellites
                      .filter(sat => sat.status === "operational")
                      .map((sat, index) => (
                        <div
                          key={sat.id}
                          className={`absolute w-3 h-3 rounded-full border-2 animate-pulse ${
                            sat.id === selectedSatellite
                              ? "bg-primary border-primary-glow shadow-glow"
                              : "bg-accent border-accent/50"
                          }`}
                          style={{
                            top: `${20 + index * 15}%`,
                            left: `${15 + index * 20}%`,
                          }}
                        >
                          <div className="absolute -top-6 -left-8 text-xs font-mono text-foreground whitespace-nowrap">
                            {sat.id}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary bg-background/80">
                    <Navigation className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-accent/30 text-accent bg-background/80">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Ground Track Info */}
              <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Current Ground Track:</span>
                  <span className="text-foreground">{currentSatellite.groundTrack}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orbital Data */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Orbit className="w-5 h-5 text-primary" />
              Orbital Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-mono text-lg text-foreground">{currentSatellite.name}</h3>
                <p className="font-mono text-sm text-muted-foreground">{currentSatellite.id}</p>
                <div className="mt-2">{getStatusBadge(currentSatellite.status)}</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">Altitude</span>
                  <span className="text-sm font-mono text-foreground">{currentSatellite.altitude}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">Inclination</span>
                  <span className="text-sm font-mono text-foreground">{currentSatellite.inclination}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">Orbital Period</span>
                  <span className="text-sm font-mono text-foreground">{currentSatellite.period}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">Velocity</span>
                  <span className="text-sm font-mono text-foreground">{currentSatellite.velocity}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">Next Pass</span>
                  <span className="text-sm font-mono text-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentSatellite.nextPass}
                  </span>
                </div>

                {currentSatellite.status === "operational" && (
                  <div className="p-3 bg-muted/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-muted-foreground">Signal Strength</span>
                      <span className="text-sm font-mono text-foreground">{currentSatellite.signal}%</span>
                    </div>
                    <Progress value={currentSatellite.signal} className="h-2" />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border/30">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-primary/30 text-primary">
                    <Activity className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-accent/30 text-accent">
                    <Navigation className="w-4 h-4 mr-2" />
                    Command
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}