
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Save, Edit, FileText, Users, Award, Network, BookOpen, Trophy } from "lucide-react";

interface AffiliateStats {
  firstYear: number;
  secondYear: number;
  thirdYear: number;
  fourthYear: number;
  totalStudents: number;
}

interface XLSSheet {
  year: string;
  fileName: string;
  uploadDate: string;
  downloadUrl: string;
}

const AffiliatesManagement = () => {
  const [stats, setStats] = useState<AffiliateStats>({
    firstYear: 150,
    secondYear: 120,
    thirdYear: 100,
    fourthYear: 80,
    totalStudents: 450
  });

  const [xlsSheets, setXlsSheets] = useState<XLSSheet[]>([
    { year: "2024-25", fileName: "students_2024_25.xlsx", uploadDate: "2024-01-15", downloadUrl: "#" },
    { year: "2023-24", fileName: "students_2023_24.xlsx", uploadDate: "2023-12-20", downloadUrl: "#" },
  ]);

  const [benefitsContent, setBenefitsContent] = useState(`
    <h3>Access to Exclusive Events</h3>
    <p>Get priority access to all SRKR Coding Club events, workshops, and hackathons.</p>
    
    <h3>Networking Opportunities</h3>
    <p>Connect with like-minded individuals, industry professionals, and potential employers.</p>
    
    <h3>Learning Resources</h3>
    <p>Access to exclusive learning materials, tutorials, and resources to enhance your skills.</p>
    
    <h3>Mentorship Programs</h3>
    <p>Get guidance from experienced mentors who can help you navigate your tech journey.</p>
    
    <h3>Project Collaboration</h3>
    <p>Collaborate on exciting projects with other club members and build your portfolio.</p>
    
    <h3>Recognition & Certificates</h3>
    <p>Get recognized for your contributions and receive certificates for participation in club activities.</p>
  `);

  const [isEditingBenefits, setIsEditingBenefits] = useState(false);

  const handleStatsUpdate = (field: keyof AffiliateStats, value: string) => {
    const numValue = parseInt(value) || 0;
    setStats(prev => {
      const updated = { ...prev, [field]: numValue };
      // Auto-calculate total if individual years are updated
      if (field !== 'totalStudents') {
        updated.totalStudents = updated.firstYear + updated.secondYear + updated.thirdYear + updated.fourthYear;
      }
      return updated;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, year: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSheet: XLSSheet = {
        year,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadUrl: URL.createObjectURL(file)
      };
      setXlsSheets(prev => [...prev.filter(sheet => sheet.year !== year), newSheet]);
    }
  };

  const benefitItems = [
    { icon: Award, title: "Access to Exclusive Events", description: "Get priority access to all SRKR Coding Club events, workshops, and hackathons." },
    { icon: Network, title: "Networking Opportunities", description: "Connect with like-minded individuals, industry professionals, and potential employers." },
    { icon: BookOpen, title: "Learning Resources", description: "Access to exclusive learning materials, tutorials, and resources to enhance your skills." },
    { icon: Users, title: "Mentorship Programs", description: "Get guidance from experienced mentors who can help you navigate your tech journey." },
    { icon: FileText, title: "Project Collaboration", description: "Collaborate on exciting projects with other club members and build your portfolio." },
    { icon: Trophy, title: "Recognition & Certificates", description: "Get recognized for your contributions and receive certificates for participation in club activities." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Affiliates Management</h1>
          <p className="text-gray-600">Manage affiliate statistics, documents, and benefits content</p>
        </div>

        {/* Statistics Update Section */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Statistics Update
            </CardTitle>
            <CardDescription className="text-white/90">
              Update the number of students in different years for affiliate cards
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstYear">First Year Students</Label>
                <Input
                  id="firstYear"
                  type="number"
                  value={stats.firstYear}
                  onChange={(e) => handleStatsUpdate('firstYear', e.target.value)}
                  className="text-center font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondYear">Second Year Students</Label>
                <Input
                  id="secondYear"
                  type="number"
                  value={stats.secondYear}
                  onChange={(e) => handleStatsUpdate('secondYear', e.target.value)}
                  className="text-center font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thirdYear">Third Year Students</Label>
                <Input
                  id="thirdYear"
                  type="number"
                  value={stats.thirdYear}
                  onChange={(e) => handleStatsUpdate('thirdYear', e.target.value)}
                  className="text-center font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fourthYear">Fourth Year Students</Label>
                <Input
                  id="fourthYear"
                  type="number"
                  value={stats.fourthYear}
                  onChange={(e) => handleStatsUpdate('fourthYear', e.target.value)}
                  className="text-center font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalStudents">Total Students</Label>
                <Input
                  id="totalStudents"
                  type="number"
                  value={stats.totalStudents}
                  onChange={(e) => handleStatsUpdate('totalStudents', e.target.value)}
                  className="text-center font-bold bg-primary/10"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Statistics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* XLS Sheet Management Section */}
        <Card className="border-2 border-accent/20">
          <CardHeader className="bg-gradient-to-r from-accent to-primary text-white">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              XLS Sheet Management
            </CardTitle>
            <CardDescription className="text-white/90">
              Upload and manage year-wise XLS sheets with download links
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {['2024-25', '2023-24', '2022-23', '2021-22'].map((year) => (
                <div key={year} className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-lg">Academic Year {year}</h3>
                  <div className="space-y-2">
                    <Label htmlFor={`upload-${year}`}>Upload XLS Sheet</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`upload-${year}`}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => handleFileUpload(e, year)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                      />
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {xlsSheets.find(sheet => sheet.year === year) && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-800">
                            {xlsSheets.find(sheet => sheet.year === year)?.fileName}
                          </p>
                          <p className="text-sm text-green-600">
                            Uploaded: {xlsSheets.find(sheet => sheet.year === year)?.uploadDate}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Content Management */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Benefits Content Management
            </CardTitle>
            <CardDescription className="text-white/90">
              Update "What they get as an affiliate of SCC" section
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!isEditingBenefits ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Benefits of Affiliation</h3>
                  <Button onClick={() => setIsEditingBenefits(true)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Content
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefitItems.map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full mr-4">
                          <benefit.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          New
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Edit Benefits Content</h3>
                  <div className="space-x-2">
                    <Button onClick={() => setIsEditingBenefits(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditingBenefits(false)} className="bg-primary hover:bg-primary/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={benefitsContent}
                  onChange={(e) => setBenefitsContent(e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                  placeholder="Enter HTML content for benefits section..."
                />
                <div className="text-sm text-gray-500">
                  Use HTML tags for formatting. Preview will be shown after saving.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              Preview of how the affiliate information will appear
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Affiliates</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Join SRKR Coding Club as an affiliate and be a part of our growing community of tech enthusiasts, innovators, and problem solvers.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stats.firstYear}</div>
                  <div className="text-sm text-gray-600">First Year</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stats.secondYear}</div>
                  <div className="text-sm text-gray-600">Second Year</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stats.thirdYear}</div>
                  <div className="text-sm text-gray-600">Third Year</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stats.fourthYear}</div>
                  <div className="text-sm text-gray-600">Fourth Year</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.totalStudents}</div>
                <div className="text-gray-600">Total Active Affiliates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffiliatesManagement;
