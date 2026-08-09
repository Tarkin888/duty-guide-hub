import React from 'react';

export default function ConsumerDutyPrimer() {
  const [primerHtml, setPrimerHtml] = React.useState<string>('');
  const [error, setError] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch('/consumer-duty-primer.html')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load primer');
        return r.text();
      })
      .then((t) => {
        if (!cancelled) setPrimerHtml(t);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const resize = () => {
      try {
        const height = iframe.contentDocument?.documentElement.scrollHeight;
        if (height) iframe.style.height = `${Math.max(800, height + 50)}px`;
      } catch {
        // cross-origin protection; ignore
      }
    };
    resize();
    try {
      const body = iframe.contentDocument?.body;
      if (body) new MutationObserver(resize).observe(body, { childList: true, subtree: true });
    } catch {
      // ignore if document not accessible
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Consumer Duty Primer</h1>
        <p className="text-muted-foreground mt-1 text-base">
          Educational orientation to the Consumer Duty framework. Use the tabs to navigate the 12 sections.
        </p>
      </header>

      <div className="rounded-lg border border-border overflow-hidden bg-background">
        {error ? (
          <p className="p-6 text-base text-destructive">
            The primer could not be loaded. Please refresh the page and try again.
          </p>
        ) : (
          <iframe
            ref={iframeRef}
            title="Consumer Duty Primer"
            srcDoc={primerHtml}
            onLoad={handleLoad}
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
            className="w-full block"
            style={{ height: 800, border: 'none' }}
          />
        )}
      </div>
    </div>
  );
}
