
// Testing utilities for cross-browser compatibility and performance monitoring
export const performanceMonitor = {
  startTiming: (label: string) => {
    if (performance.mark) {
      performance.mark(`${label}-start`);
    }
    console.log(`⏱️ Starting: ${label}`);
  },

  endTiming: (label: string) => {
    if (performance.mark && performance.measure) {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const entries = performance.getEntriesByName(label);
      const duration = entries[entries.length - 1]?.duration;
      console.log(`⏱️ Completed: ${label} in ${duration?.toFixed(2)}ms`);
      return duration;
    }
    console.log(`⏱️ Completed: ${label}`);
  }
};

export const browserCompatibility = {
  checkSupport: () => {
    const features = {
      localStorage: typeof Storage !== 'undefined',
      fileAPI: 'File' in window && 'FileReader' in window && 'FileList' in window,
      dragAndDrop: 'draggable' in document.createElement('div'),
      formData: 'FormData' in window,
      fetch: 'fetch' in window,
      promises: 'Promise' in window,
      webGL: !!window.WebGLRenderingContext,
    };

    console.log('🌐 Browser Feature Support:', features);
    return features;
  },

  getUserAgent: () => {
    return {
      browser: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
    };
  }
};

export const roleTestingHelper = {
  // Mock role switching for testing different permissions
  testRoles: ['admin', 'attorney', 'paralegal', 'staff'] as const,
  
  simulateRoleAccess: (role: string, feature: string) => {
    const permissions = {
      admin: ['all'],
      attorney: ['clients', 'providers', 'requests', 'documents', 'reports'],
      paralegal: ['clients', 'requests', 'documents'],
      staff: ['assigned-clients', 'documents']
    };

    const rolePerms = permissions[role as keyof typeof permissions] || [];
    const hasAccess = rolePerms.includes('all') || rolePerms.includes(feature);
    
    console.log(`🔐 Role: ${role}, Feature: ${feature}, Access: ${hasAccess ? '✅' : '❌'}`);
    return hasAccess;
  }
};

export const fileTestingHelper = {
  supportedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png', 
    'image/tiff'
  ],

  supportedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.tiff', '.tif'],

  createTestFile: (type: string, sizeKB: number = 100) => {
    const content = 'a'.repeat(sizeKB * 1024);
    return new File([content], `test-file.${type}`, { type: `application/${type}` });
  },

  validateFileIntegrity: (originalFile: File, processedFile: File) => {
    const checks = {
      sameSize: originalFile.size === processedFile.size,
      sameName: originalFile.name === processedFile.name,
      sameType: originalFile.type === processedFile.type,
    };

    console.log('📁 File Integrity Check:', checks);
    return Object.values(checks).every(Boolean);
  }
};
