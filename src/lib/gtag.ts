export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export const pageview = (url: string, title?: string) => {
  if (typeof window === 'undefined') return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];

  if (GA4_ID) {
    // Define a gtag shim if the afterInteractive gtag stub hasn't run yet,
    // so the initial pageview is queued into dataLayer instead of dropped.
    if (typeof w.gtag !== 'function') {
      w.gtag = function gtag() {
        w.dataLayer.push(arguments);
      };
    }
    w.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: w.location.href,
      send_to: GA4_ID,
    });
    return;
  }

  // Fallback for GTM-based setups: push into dataLayer
  if (GTM_ID) {
    w.dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_title: title || document.title,
      page_location: w.location.href,
    });
  }
};

export const event = (action: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  if (GA4_ID && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  } else if (GTM_ID) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: action, ...params });
  }
};
