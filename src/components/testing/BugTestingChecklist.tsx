
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Bug, CheckSquare, AlertTriangle } from 'lucide-react';

const TEST_CATEGORIES = {
  'End-to-End Workflow': [
    'Client intake form submission',
    'Provider linking functionality',
    'Request generation and sending',
    'Letter template creation',
    'Document upload process',
    'Report generation and export'
  ],
  'Role-Based Access': [
    'Admin can access all features',
    'Attorney can access assigned features',
    'Paralegal has limited access',
    'Staff can only see assigned clients',
    'Unauthorized access is blocked'
  ],
  'File Handling': [
    'PDF upload and download',
    'JPEG/JPG image processing',
    'PNG image handling',
    'TIFF file support',
    'File size validation (50MB limit)',
    'File type validation',
    'Download integrity check'
  ],
  'Cross-Browser Compatibility': [
    'Chrome functionality',
    'Safari compatibility',
    'Firefox support',
    'Edge browser support',
    'Mobile browser testing'
  ],
  'Performance & UX': [
    'Page load times under 3 seconds',
    'Form submission responsiveness',
    'File upload progress indicators',
    'Loading states for async operations',
    'Error handling and user feedback',
    'Mobile responsive design'
  ]
};

const KNOWN_ISSUES = [
  {
    severity: 'high',
    category: 'File Upload', 
    description: 'Large files (>25MB) may timeout on slow connections',
    status: 'open'
  },
  {
    severity: 'medium',
    category: 'Browser Compatibility',
    description: 'Drag and drop not working in older Safari versions',
    status: 'investigating'
  },
  {
    severity: 'low',
    category: 'UI/UX',
    description: 'Progress bar animation stutters on some devices',
    status: 'open'
  }
];

export default function BugTestingChecklist() {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [bugReports, setBugReports] = useState<any[]>([]);
  const [newBugReport, setNewBugReport] = useState('');

  const handleCheckItem = (category: string, item: string) => {
    const key = `${category}-${item}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCompletionRate = (category: string) => {
    const items = TEST_CATEGORIES[category as keyof typeof TEST_CATEGORIES];
    const checkedCount = items.filter(item => 
      checkedItems[`${category}-${item}`]
    ).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  const addBugReport = () => {
    if (newBugReport.trim()) {
      setBugReports(prev => [...prev, {
        id: Date.now(),
        description: newBugReport,
        timestamp: new Date().toLocaleString(),
        status: 'new'
      }]);
      setNewBugReport('');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-28 right-4 z-50"
      >
        <Bug className="w-4 h-4 mr-2" />
        Testing Checklist
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-28 right-4 w-96 max-h-96 overflow-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            QA Testing Checklist
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Categories */}
        <div className="space-y-3">
          {Object.entries(TEST_CATEGORIES).map(([category, items]) => {
            const completion = getCompletionRate(category);
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{category}</h4>
                  <Badge variant={completion === 100 ? "default" : "secondary"}>
                    {completion}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  {items.map(item => {
                    const isChecked = checkedItems[`${category}-${item}`];
                    return (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleCheckItem(category, item)}
                          className="w-3 h-3"
                        />
                        <span className={`text-xs ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Known Issues */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Known Issues
          </h4>
          <div className="space-y-1">
            {KNOWN_ISSUES.map((issue, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(issue.severity)}`} />
                  <span className="font-medium">{issue.category}</span>
                  <Badge variant="outline" className="text-xs">
                    {issue.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bug Report Form */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Report New Bug</h4>
          <Textarea
            placeholder="Describe the bug, steps to reproduce, expected vs actual behavior..."
            value={newBugReport}
            onChange={(e) => setNewBugReport(e.target.value)}
            className="text-xs"
            rows={3}
          />
          <Button 
            size="sm" 
            onClick={addBugReport}
            disabled={!newBugReport.trim()}
            className="w-full"
          >
            Report Bug
          </Button>
        </div>

        {/* Recent Bug Reports */}
        {bugReports.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Reports</h4>
            <div className="space-y-1 max-h-20 overflow-auto">
              {bugReports.slice(-3).map(report => (
                <div key={report.id} className="text-xs p-2 bg-muted rounded">
                  <div className="font-medium">{report.timestamp}</div>
                  <div className="text-muted-foreground truncate">{report.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
