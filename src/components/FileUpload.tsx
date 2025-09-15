import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle,
  X,
  FolderOpen,
  Database,
  Settings,
  Play
} from "lucide-react";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "completed" | "failed" | "queued";
  progress: number;
  satellite?: string;
  dataType?: string;
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Sample uploaded files
  const [uploadHistory] = useState<UploadFile[]>([
    {
      id: "1",
      name: "terra_modis_ocean_2024015.hdf",
      size: 2400000000,
      type: "HDF5",
      status: "completed",
      progress: 100,
      satellite: "Terra",
      dataType: "Ocean Color"
    },
    {
      id: "2",
      name: "landsat9_oli_scene_001.tif",
      size: 1800000000,
      type: "GeoTIFF",
      status: "completed", 
      progress: 100,
      satellite: "Landsat-9",
      dataType: "Multispectral"
    },
    {
      id: "3",
      name: "sentinel2_msi_l2a.SAFE",
      size: 890000000,
      type: "SAFE",
      status: "failed",
      progress: 67,
      satellite: "Sentinel-2A", 
      dataType: "Cloud Mask"
    }
  ]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file, index) => {
      const newFile: UploadFile = {
        id: Date.now().toString() + index,
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop()?.toUpperCase() || "Unknown",
        status: "queued",
        progress: 0
      };
      
      setFiles(prev => [...prev, newFile]);
      
      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              status: progress >= 100 ? "completed" : "uploading",
              progress: Math.min(progress, 100)
            }
          : file
      ));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case "uploading":
        return <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">Uploading</Badge>;
      case "failed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Failed</Badge>;
      case "queued":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Queued</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">File Upload Center</h1>
        <p className="text-muted-foreground font-mono">
          Upload satellite data files for processing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upload Area */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Upload className="w-5 h-5 text-primary" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                dragActive 
                  ? "border-primary bg-primary/10 shadow-glow" 
                  : "border-border/50 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Supported formats: HDF, NetCDF, GeoTIFF, SAFE, CSV
                  </p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
              </div>
            </div>

            {/* Upload Configuration */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="satellite" className="text-sm font-mono text-muted-foreground">
                    Target Satellite
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-muted/20 border-border/50">
                      <SelectValue placeholder="Select satellite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terra">Terra</SelectItem>
                      <SelectItem value="aqua">Aqua</SelectItem>
                      <SelectItem value="landsat9">Landsat-9</SelectItem>
                      <SelectItem value="sentinel2a">Sentinel-2A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="datatype" className="text-sm font-mono text-muted-foreground">
                    Data Type
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-muted/20 border-border/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocean">Ocean Color</SelectItem>
                      <SelectItem value="multispectral">Multispectral</SelectItem>
                      <SelectItem value="thermal">Thermal</SelectItem>
                      <SelectItem value="radar">Radar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-mono text-muted-foreground">
                  Description (Optional)
                </Label>
                <Input 
                  placeholder="Enter file description..."
                  className="bg-muted/20 border-border/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Queue */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Database className="w-5 h-5 text-primary" />
              Upload Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {files.length === 0 ? (
                <div className="text-center py-8">
                  <File className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground font-mono">No files in queue</p>
                </div>
              ) : (
                files.map((file) => (
                  <div key={file.id} className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {formatFileSize(file.size)} • {file.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusBadge(file.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {(file.status === "uploading" || file.status === "queued") && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground font-mono">
                            {file.status === "uploading" ? "Uploading..." : "Queued"}
                          </span>
                          <span className="text-muted-foreground font-mono">
                            {file.progress}%
                          </span>
                        </div>
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-success/30 text-success flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Upload
                  </Button>
                  <Button variant="outline" size="sm" className="border-muted/30 text-muted-foreground">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload History */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <File className="w-5 h-5 text-primary" />
            Recent Uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadHistory.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0">
                    {file.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.satellite}</span>
                      <span>{file.dataType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(file.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}