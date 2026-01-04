import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// FCA RSS feeds for Consumer Duty related content
const FCA_RSS_FEEDS = [
  'https://www.fca.org.uk/news/news-stories.rss',
  'https://www.fca.org.uk/publications/finalised-guidance.rss',
  'https://www.fca.org.uk/publications/multi-firm-reviews.rss',
  'https://www.fca.org.uk/publications/dear-ceo-letters.rss',
];

// Keywords to filter Consumer Duty related content
const CONSUMER_DUTY_KEYWORDS = [
  'consumer duty',
  'consumer outcomes',
  'fair value',
  'price and value',
  'consumer understanding',
  'consumer support',
  'vulnerable customers',
  'treating customers fairly',
  'tcf',
  'product governance',
  'target market',
  'distribution chain',
];

// Map categories based on URL patterns
function categorizeUpdate(link: string, title: string): string {
  const lowerLink = link.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  if (lowerLink.includes('dear-ceo') || lowerTitle.includes('dear ceo')) {
    return 'dear_ceo_letter';
  }
  if (lowerLink.includes('multi-firm') || lowerTitle.includes('multi-firm review')) {
    return 'multi_firm_review';
  }
  if (lowerLink.includes('consultation') || lowerTitle.includes('consultation')) {
    return 'consultation';
  }
  if (lowerLink.includes('guidance') || lowerLink.includes('finalised-guidance')) {
    return 'guidance';
  }
  return 'other';
}

// Determine affected modules based on content
function determineAffectedModules(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const modules: string[] = [];
  
  // Products & Services
  if (text.includes('product') || text.includes('service design') || text.includes('target market')) {
    modules.push('CD-I1');
  }
  // Price & Value
  if (text.includes('price') || text.includes('value') || text.includes('fair value') || text.includes('cost')) {
    modules.push('CD-I2');
  }
  // Consumer Understanding
  if (text.includes('understanding') || text.includes('communication') || text.includes('disclosure')) {
    modules.push('CD-I3');
  }
  // Consumer Support
  if (text.includes('support') || text.includes('complaint') || text.includes('service')) {
    modules.push('CD-I4');
  }
  // Vulnerable Customers
  if (text.includes('vulnerable') || text.includes('vulnerability')) {
    modules.push('CD-I5');
  }
  // Distribution Chain
  if (text.includes('distribution') || text.includes('third party') || text.includes('intermediar')) {
    modules.push('CD-I6');
  }
  // Data & Evidence
  if (text.includes('data') || text.includes('evidence') || text.includes('monitoring') || text.includes('mi ')) {
    modules.push('CD-I7');
  }
  // Governance
  if (text.includes('governance') || text.includes('board') || text.includes('oversight')) {
    modules.push('CD-P1');
  }
  // MI & Monitoring
  if (text.includes('mi') || text.includes('management information') || text.includes('metric')) {
    modules.push('CD-M1');
  }
  // Board Reporting
  if (text.includes('board report') || text.includes('reporting')) {
    modules.push('CD-M3');
  }
  // Implementation
  if (text.includes('implementation') || text.includes('roadmap') || text.includes('plan')) {
    modules.push('CD-P3');
  }
  
  return [...new Set(modules)]; // Remove duplicates
}

// Parse RSS XML
function parseRSS(xml: string): Array<{title: string; description: string; link: string; pubDate: string}> {
  const items: Array<{title: string; description: string; link: string; pubDate: string}> = [];
  
  // Simple XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s.exec(itemContent);
    const descMatch = /<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/s.exec(itemContent);
    const linkMatch = /<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/s.exec(itemContent);
    const pubDateMatch = /<pubDate>(.*?)<\/pubDate>/s.exec(itemContent);
    
    const title = titleMatch ? titleMatch[1].trim() : '';
    const description = descMatch ? descMatch[1].trim().replace(/<[^>]*>/g, '') : '';
    const link = linkMatch ? linkMatch[1].trim() : '';
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
    
    if (title && link) {
      items.push({ title, description, link, pubDate });
    }
  }
  
  return items;
}

// Check if content is Consumer Duty related
function isConsumerDutyRelated(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return CONSUMER_DUTY_KEYWORDS.some(keyword => text.includes(keyword));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting FCA RSS feed fetch...');
    
    const allUpdates: Array<{
      title: string;
      description: string;
      link: string;
      pub_date: string;
      category: string;
      affected_modules: string[];
      source: string;
    }> = [];

    // Fetch each RSS feed
    for (const feedUrl of FCA_RSS_FEEDS) {
      try {
        console.log(`Fetching: ${feedUrl}`);
        const response = await fetch(feedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ConsumerDutyBot/1.0)',
          },
        });
        
        if (!response.ok) {
          console.log(`Failed to fetch ${feedUrl}: ${response.status}`);
          continue;
        }
        
        const xml = await response.text();
        const items = parseRSS(xml);
        
        for (const item of items) {
          // Only include Consumer Duty related content
          if (isConsumerDutyRelated(item.title, item.description)) {
            const category = categorizeUpdate(item.link, item.title);
            const affectedModules = determineAffectedModules(item.title, item.description);
            
            allUpdates.push({
              title: item.title,
              description: item.description.substring(0, 500), // Limit description length
              link: item.link,
              pub_date: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
              category,
              affected_modules: affectedModules.length > 0 ? affectedModules : ['CD-P1'], // Default to governance
              source: 'FCA',
            });
          }
        }
      } catch (feedError) {
        console.error(`Error fetching feed ${feedUrl}:`, feedError);
      }
    }

    console.log(`Found ${allUpdates.length} Consumer Duty related updates`);

    // Insert new updates (ignore duplicates based on link)
    let insertedCount = 0;
    for (const update of allUpdates) {
      const { error } = await supabase
        .from('regulatory_updates')
        .upsert(update, { onConflict: 'link', ignoreDuplicates: true });
      
      if (!error) {
        insertedCount++;
      }
    }

    console.log(`Inserted/updated ${insertedCount} updates`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${allUpdates.length} updates, inserted/updated ${insertedCount}`,
        updatesFound: allUpdates.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-fca-updates:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
