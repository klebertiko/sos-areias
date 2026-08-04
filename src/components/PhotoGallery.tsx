import React, { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, FolderOpen, ExternalLink } from 'lucide-react';
import { TrackPhoto } from '../types';
import { PHOTOS_DRIVE_URL } from '../data/mockData';

interface PhotoGalleryProps {
  photos: TrackPhoto[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Camera size={16} className="text-yellow-500" />
          Como a pista está hoje
        </h4>
        <a
          href={PHOTOS_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-yellow-400 transition-colors shrink-0"
        >
          <FolderOpen size={12} />
          Ver todas
          <ExternalLink size={10} />
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-zinc-800 hover:border-yellow-500/60 transition-colors"
          >
            <img
              src={photo.thumb}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={photos[activeIndex].alt}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-2 sm:left-6 p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-2 sm:right-6 p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={28} />
          </button>

          <div className="max-w-3xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <p className="text-center text-xs text-zinc-400 font-mono">
              {photos[activeIndex].alt} · {activeIndex + 1}/{photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
