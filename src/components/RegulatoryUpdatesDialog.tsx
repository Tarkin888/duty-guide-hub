import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell, 
  ExternalLink, 
  Check, 
  FileText, 
  Mail, 
  Users, 
  MessageSquare,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface RegulatoryUpdate {
  id: string;
  title: string;
  description: string | null;
  link: string;
  pub_date: string;
  category: string;
  affected_modules: string[];
  source: string;
  created_at: string;
}

interface UserUpdateRead {
  update_id: string;
}

// Module display names
const MODULE_NAMES: Record<string, string> = {
  'CD-F1': 'Readiness Assessment',
  'CD-F2': 'Requirements Mapping',
  'CD-F3': 'Risk & Impact',
  'CD-P1': 'Governance',
  'CD-P2': 'Policy Framework',
  'CD-P3': 'Implementation',
  'CD-I1': 'Products & Services',
  'CD-I2': 'Price & Value',
  'CD-I3': 'Consumer Understanding',
  'CD-I4': 'Consumer Support',
  'CD-I5': 'Vulnerable Customers',
  'CD-I6': 'Distribution Chain',
  'CD-I7': 'Data & Evidence',
  'CD-M1': 'MI Framework',
  'CD-M2': 'Testing & Assurance',
  'CD-M3': 'Board Reporting',
  'CD-M4': 'Continuous Improvement',
  'CD-T1': 'Training',
  'CD-T2': 'Communications',
  'CD-T3': 'Technology',
};

// Module routes
const MODULE_ROUTES: Record<string, string> = {
  'CD-F1': '/foundation/readiness',
  'CD-F2': '/foundation/requirements',
  'CD-F3': '/foundation/risk-impact',
  'CD-P1': '/governance/framework',
  'CD-P2': '/governance/policy',
  'CD-P3': '/governance/roadmap',
  'CD-I1': '/outcomes/products-services',
  'CD-I2': '/outcomes/price-value',
  'CD-I3': '/outcomes/consumer-understanding',
  'CD-I4': '/outcomes/consumer-support',
  'CD-I5': '/cross-cutting/vulnerable-customers',
  'CD-I6': '/cross-cutting/distribution-chain',
  'CD-I7': '/cross-cutting/data-evidence',
  'CD-M1': '/monitoring/mi-monitoring',
  'CD-M2': '/monitoring/testing-assurance',
  'CD-M3': '/monitoring/board-reporting',
  'CD-M4': '/monitoring/continuous-improvement',
  'CD-T1': '/enablement/training',
  'CD-T2': '/enablement/communications',
  'CD-T3': '/enablement/technology',
};

// Get or create user ID from localStorage
function getUserId(): string {
  let userId = localStorage.getItem('consumer-duty-user-id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('consumer-duty-user-id', userId);
  }
  return userId;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'dear_ceo_letter':
      return <Mail className="h-4 w-4" />;
    case 'multi_firm_review':
      return <Users className="h-4 w-4" />;
    case 'guidance':
      return <FileText className="h-4 w-4" />;
    case 'consultation':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'dear_ceo_letter':
      return 'Dear CEO Letter';
    case 'multi_firm_review':
      return 'Multi-firm Review';
    case 'guidance':
      return 'Guidance';
    case 'consultation':
      return 'Consultation';
    default:
      return 'Update';
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'dear_ceo_letter':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'multi_firm_review':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'guidance':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'consultation':
      return 'bg-info/10 text-info border-info/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

interface RegulatoryUpdatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnreadCountChange?: (count: number) => void;
}

export function RegulatoryUpdatesDialog({ 
  open, 
  onOpenChange,
  onUnreadCountChange 
}: RegulatoryUpdatesDialogProps) {
  const [updates, setUpdates] = useState<RegulatoryUpdate[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUpdates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('regulatory_updates')
        .select('*')
        .order('pub_date', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Cast the data to handle the affected_modules type
      const typedData = (data || []).map(item => ({
        ...item,
        affected_modules: item.affected_modules as string[]
      }));
      
      setUpdates(typedData);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  }, []);

  const fetchReadStatus = useCallback(async () => {
    const userId = getUserId();
    try {
      const { data, error } = await supabase
        .from('user_update_reads')
        .select('update_id')
        .eq('user_id', userId);

      if (error) throw error;
      setReadIds(new Set((data || []).map((r: UserUpdateRead) => r.update_id)));
    } catch (error) {
      console.error('Error fetching read status:', error);
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchUpdates(), fetchReadStatus()]);
    setLoading(false);
  }, [fetchUpdates, fetchReadStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Calculate and report unread count
  useEffect(() => {
    const unreadCount = updates.filter(u => !readIds.has(u.id)).length;
    onUnreadCountChange?.(unreadCount);
  }, [updates, readIds, onUnreadCountChange]);

  const handleMarkAsRead = async (updateId: string) => {
    const userId = getUserId();
    try {
      const { error } = await supabase
        .from('user_update_reads')
        .insert({ user_id: userId, update_id: updateId });

      if (error && !error.message.includes('duplicate')) throw error;
      
      setReadIds(prev => new Set([...prev, updateId]));
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    const userId = getUserId();
    const unreadIds = updates.filter(u => !readIds.has(u.id)).map(u => u.id);
    
    if (unreadIds.length === 0) return;

    try {
      const inserts = unreadIds.map(update_id => ({ user_id: userId, update_id }));
      const { error } = await supabase
        .from('user_update_reads')
        .upsert(inserts, { onConflict: 'user_id,update_id' });

      if (error) throw error;
      
      setReadIds(prev => new Set([...prev, ...unreadIds]));
      toast.success('All updates marked as read');
    } catch (error) {
      console.error('Error marking all as read:', error);
      toast.error('Failed to mark all as read');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Call the edge function to fetch new updates
      const { error } = await supabase.functions.invoke('fetch-fca-updates');
      if (error) throw error;
      
      // Reload the updates
      await fetchUpdates();
      toast.success('Updates refreshed');
    } catch (error) {
      console.error('Error refreshing:', error);
      toast.error('Failed to refresh updates');
    } finally {
      setRefreshing(false);
    }
  };

  const unreadCount = updates.filter(u => !readIds.has(u.id)).length;
  const latestUpdate = updates[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-info" />
            Regulatory Updates
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Latest FCA guidance and publications affecting Consumer Duty compliance.
            {latestUpdate && (
              <span className="block mt-1 text-xs">
                Last updated: {format(new Date(latestUpdate.created_at), "d MMMM yyyy")}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[500px] pr-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : updates.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No regulatory updates found</p>
              <Button onClick={handleRefresh} variant="outline" className="mt-4">
                Refresh from FCA
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map(update => {
                const isRead = readIds.has(update.id);
                
                return (
                  <Card 
                    key={update.id} 
                    className={`transition-all ${!isRead ? 'border-primary/50 bg-primary/5' : ''}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="outline" 
                              className={`${getCategoryColor(update.category)} gap-1`}
                            >
                              {getCategoryIcon(update.category)}
                              {getCategoryLabel(update.category)}
                            </Badge>
                            {!isRead && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-base leading-tight">
                            {update.title}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(update.pub_date), { addSuffix: true })}
                        {' • '}
                        {format(new Date(update.pub_date), "d MMM yyyy")}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {update.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {update.description}
                        </p>
                      )}
                      
                      {update.affected_modules && update.affected_modules.length > 0 && (
                        <div>
                          <p className="text-xs font-medium mb-1.5">Affected Modules:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {update.affected_modules.map(moduleId => (
                              <Link
                                key={moduleId}
                                to={MODULE_ROUTES[moduleId] || '/'}
                                onClick={() => onOpenChange(false)}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs cursor-pointer hover:bg-secondary/80"
                                >
                                  {MODULE_NAMES[moduleId] || moduleId}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="gap-1"
                        >
                          <a 
                            href={update.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleMarkAsRead(update.id)}
                          >
                            Read on FCA
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                        {!isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(update.id)}
                            className="gap-1"
                          >
                            <Check className="h-3 w-3" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <p className="text-[10px] text-muted-foreground/70 text-center mt-2">
          Updates sourced from FCA RSS feeds. Refresh to check for new publications.
        </p>
      </DialogContent>
    </Dialog>
  );
}
