import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Download, 
  Filter, 
  Calendar,
  FileImage,
  Database,
  Eye,
  ExternalLink
} from "lucide-react";

export function DataBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSatellite, setSelectedSatellite] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Sample data
  const datasets = [
    {
      id: "DS-001",
      name: "Terra_MODIS_L2_Ocean_Color_2024_001",
      satellite: "Terra",
      type: "Ocean Color",
      date: "2024-01-15",
      size: "2.4 GB",
      format: "HDF5",
      quality: "validated",
      downloads: 1247,
      thumbnail: "🌊"
    },
    {
      id: "DS-002", 
      name: "Landsat9_OLI_TIRS_L1TP_2024_002",
      satellite: "Landsat-9",
      type: "Multispectral",
      date: "2024-01-14",
      size: "1.8 GB",
      format: "GeoTIFF",
      quality: "processing",
      downloads: 892,
      thumbnail: "🛰️"
    },
    {
      id: "DS-003",
      name: "Sentinel2A_MSI_L2A_CloudMask_2024_003", 
      satellite: "Sentinel-2A",
      type: "Cloud Mask",
      date: "2024-01-13",
      size: "890 MB",
      format: "NetCDF",
      quality: "validated",
      downloads: 2156,
      thumbnail: "☁️"
    },
    {
      id: "DS-004",
      name: "Aqua_MODIS_Chlorophyll_Concentration_2024_004",
      satellite: "Aqua",
      type: "Chlorophyll",
      date: "2024-01-12",
      size: "3.1 GB", 
      format: "HDF4",
      quality: "validated",
      downloads: 756,
      thumbnail: "🌱"
    },
    {
      id: "DS-005",
      name: "MODIS_Fire_Detection_Global_2024_005",
      satellite: "Terra",
      type: "Fire Detection",
      date: "2024-01-11",
      size: "445 MB",
      format: "CSV",
      quality: "preliminary",
      downloads: 1834,
      thumbnail: "🔥"
    }
  ];

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "validated":
        return <Badge className="bg-success/20 text-success border-success/30">Validated</Badge>;
      case "processing":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Processing</Badge>;
      case "preliminary":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Preliminary</Badge>;
      default:
        return <Badge variant="secondary">{quality}</Badge>;
    }
  };

  const filteredData = datasets.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSatellite = selectedSatellite === "all" || item.satellite === selectedSatellite;
    const matchesType = selectedType === "all" || item.type === selectedType;
    
    return matchesSearch && matchesSatellite && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Browser</h1>
        <p className="text-muted-foreground font-mono">
          Search, filter, and download satellite datasets
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="w-5 h-5 text-primary" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search datasets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-muted/20 border-border/50 pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedSatellite} onValueChange={setSelectedSatellite}>
              <SelectTrigger className="bg-muted/20 border-border/50">
                <SelectValue placeholder="Satellite" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Satellites</SelectItem>
                <SelectItem value="Terra">Terra</SelectItem>
                <SelectItem value="Aqua">Aqua</SelectItem>
                <SelectItem value="Landsat-9">Landsat-9</SelectItem>
                <SelectItem value="Sentinel-2A">Sentinel-2A</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-muted/20 border-border/50">
                <SelectValue placeholder="Data Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Ocean Color">Ocean Color</SelectItem>
                <SelectItem value="Multispectral">Multispectral</SelectItem>
                <SelectItem value="Cloud Mask">Cloud Mask</SelectItem>
                <SelectItem value="Chlorophyll">Chlorophyll</SelectItem>
                <SelectItem value="Fire Detection">Fire Detection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <Database className="w-4 h-4" />
              {filteredData.length} datasets found
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-primary/30 text-primary">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" size="sm" className="border-accent/30 text-accent">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileImage className="w-5 h-5 text-primary" />
            Dataset Catalog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead className="text-muted-foreground font-mono">Dataset</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Satellite</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Type</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Date</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Size</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Quality</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Downloads</TableHead>
                  <TableHead className="text-muted-foreground font-mono">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((dataset) => (
                  <TableRow key={dataset.id} className="border-border/20 hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{dataset.thumbnail}</span>
                        <div>
                          <div className="font-medium text-foreground text-sm">
                            {dataset.name}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {dataset.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{dataset.satellite}</TableCell>
                    <TableCell className="font-mono text-sm">{dataset.type}</TableCell>
                    <TableCell className="font-mono text-sm">{dataset.date}</TableCell>
                    <TableCell className="font-mono text-sm">{dataset.size}</TableCell>
                    <TableCell>{getQualityBadge(dataset.quality)}</TableCell>
                    <TableCell className="font-mono text-sm">{dataset.downloads.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-primary hover:bg-primary/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-accent hover:bg-accent/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-success hover:bg-success/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}