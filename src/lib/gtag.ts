export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export const pageview = (url: string, title?: string) => {
  if (typeof window === 'undefined') return;

  // Prefer direct GA4 gtag if available
  if (GA4_ID && (window as any).gtag) {
    (window as any).gtag('config', GA4_ID, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
    return;
  }

  // Fallback for GTM-based setups: push into dataLayer
  if (GTM_ID) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
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
