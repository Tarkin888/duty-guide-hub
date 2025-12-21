import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class StorageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Storage error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      // Clear all app-related localStorage keys
      const keysToRemove = [
        'consumer-duty-progress',
        'consumer-duty-progress-v2',
        'consumer-duty-activity',
        'consumer-duty-user-data',
        'implementation-start-date',
      ];
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      window.location.reload();
    } catch (e) {
      alert('Unable to reset. Please clear your browser cache manually (Ctrl+Shift+Delete).');
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-lg w-full border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                There was an issue loading your progress data. This might be due to corrupted localStorage data or a browser issue.
              </p>
              
              <div className="p-3 bg-muted rounded-lg text-sm font-mono overflow-auto">
                {this.state.error?.message || 'Unknown error'}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={this.handleRetry} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                <Button variant="destructive" onClick={this.handleReset} className="flex-1">
                  Reset All Data
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                If the issue persists after resetting, try clearing your browser cache or using a different browser.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default StorageErrorBoundary;
