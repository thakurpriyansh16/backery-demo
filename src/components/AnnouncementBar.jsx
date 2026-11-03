import React, { useState } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!siteConfig.announcement?.enabled || !isVisible) {
    return null;
  }

  return (
    <div className="relative bg-chocolate-dark text-cream-100 text-xs md:text-sm font-medium py-2.5 px-4 tracking-wide border-b border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 animate-pulse-subtle" />
          <span className="text-cream-200/90 font-sans">
            {siteConfig.announcement.text}
          </span>
          {siteConfig.announcement.linkHref && (
            <a
              href={siteConfig.announcement.linkHref}
              className="inline-flex items-center gap-1 font-semibold text-gold hover:text-gold-light ml-1 underline decoration-gold/40 underline-offset-2 transition-colors"
            >
              <span>{siteConfig.announcement.linkText || 'Explore'}</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          )}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-cream-200/60 hover:text-cream-100 transition-colors p-1"
          aria-label="Close announcement banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
