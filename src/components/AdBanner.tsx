'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  position: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
}

export default function AdBanner({ position, format = 'auto' }: AdBannerProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!adsenseId) {
    return (
      <div className="ad-container">
        <p className="text-gray-400 font-bengali">বিজ্ঞাপনের জায়গা</p>
      </div>
    );
  }

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={`slot-${position}`}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
