import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";

interface RegulatoryQuoteProps {
  source: string;
  reference: string;
  quote: string;
  link?: string;
}

export function RegulatoryQuote({ source, reference, quote, link }: RegulatoryQuoteProps) {
  return (
    <Card className="border-l-4 border-l-primary bg-muted/30 p-4">
      <div className="flex gap-3">
        <Scale className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-primary">{source}</span>
            <span className="text-sm text-muted-foreground">{reference}</span>
          </div>
          <blockquote className="text-sm leading-relaxed text-foreground italic">
            "{quote}"
          </blockquote>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              View source →
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
