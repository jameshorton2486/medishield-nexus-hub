
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { performanceMonitor, browserCompatibility } from '@/utils/testingHelpers';
import { Activity, Globe, Clock, Zap } from 'lucide-react';

export default function PerformanceTestingPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any>({});
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  useEffect(() => {
    // Get browser compatibility info
    const support = browserCompatibility.checkSupport();
    const userAgent = browserCompatibility.getUserAgent();
    setBrowserInfo({ support, userAgent });

    // Measure page load performance
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setPageLoadTime(loadTime);
    }
  }, []);

  const runPerformanceTests = () => {
    const tests = [
      { name: 'DOM Manipulation', test: () => testDOMPerformance() },
      { name: 'File Processing', test: () => testFileProcessing() },
      { name: 'Memory Usage', test: () => testMemoryUsage() },
      { name: 'Network Timing', test: () => testNetworkTiming() }
    ];

    const results: any = {};
    tests.forEach(({ name, test }) => {
      performanceMonitor.startTiming(name);
      try {
        const result = test();
        results[name] = { success: true, result };
      } catch (error) {
        results[name] = { success: false, error: error.message };
      }
      performanceMonitor.endTiming(name);
    });

    setPerformanceData(results);
  };

  const testDOMPerformance = () => {
    const startTime = performance.now();
    // Simulate DOM operations
    for (let i = 0; i < 1000; i++) {
      const div = document.createElement('div');
      div.textContent = `Test ${i}`;
      document.body.appendChild(div);
      document.body.removeChild(div);
    }
    return performance.now() - startTime;
  };

  const testFileProcessing = () => {
    const startTime = performance.now();
    // Simulate file processing
    const testData = new Array(10000).fill('test data').join('');
    const blob = new Blob([testData], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });
    return { 
      duration: performance.now() - startTime,
      fileSize: file.size,
      blobSupported: !!blob
    };
  };

  const testMemoryUsage = () => {
    if ('memory' in performance) {
      return {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return { message: 'Memory API not available' };
  };

  const testNetworkTiming = () => {
    if (performance.getEntriesByType) {
      const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        dns: entries.domainLookupEnd - entries.domainLookupStart,
        tcp: entries.connectEnd - entries.connectStart,
        request: entries.responseStart - entries.requestStart,
        response: entries.responseEnd - entries.responseStart,
        domLoad: entries.domContentLoadedEventEnd - entries.domContentLoadedEventStart
      };
    }
    return { message: 'Navigation timing not available' };
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-16 right-4 z-50"
      >
        <Activity className="w-4 h-4 mr-2" />
        Performance
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-16 right-4 w-96 max-h-96 overflow-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance & Compatibility
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Page Load</span>
            <Badge variant={pageLoadTime && pageLoadTime < 3000 ? "default" : "destructive"}>
              {pageLoadTime ? `${pageLoadTime}ms` : 'Unknown'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">Browser</span>
            <Badge variant="outline" className="text-xs">
              {browserInfo?.userAgent?.browser?.split(' ')[0] || 'Unknown'}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Feature Support</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {browserInfo?.support && Object.entries(browserInfo.support).map(([feature, supported]) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                <Badge variant={supported ? "default" : "destructive"} className="text-xs">
                  {supported ? "✓" : "✗"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-muted-foreground">Performance Tests</h4>
            <Button size="sm" variant="outline" onClick={runPerformanceTests}>
              <Zap className="w-3 h-3 mr-1" />
              Run Tests
            </Button>
          </div>
          
          {Object.keys(performanceData).length > 0 && (
            <div className="space-y-1 text-xs">
              {Object.entries(performanceData).map(([test, result]: [string, any]) => (
                <div key={test} className="flex items-center justify-between">
                  <span>{test}</span>
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? "✓" : "✗"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
