'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FileText, Download, ExternalLink, Maximize2, X } from 'lucide-react';

export function isImageAttachment(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
}

export function getAttachmentFileName(url: string): string {
  try {
    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.split('/');
    const fullName = parts[parts.length - 1];
    // Remove timestamp prefix like "1789818048199-478622724-"
    const cleanName = fullName.replace(/^\d+-\d+-/, '');
    return cleanName || 'Attachment';
  } catch {
    return 'Attachment';
  }
}

export function getFileTypeLabel(url: string): string {
  if (/\.pdf(\?.*)?$/i.test(url)) return 'PDF Document';
  if (/\.(docx?|rtf)(\?.*)?$/i.test(url)) return 'Word Document';
  if (/\.(xlsx?|csv)(\?.*)?$/i.test(url)) return 'Spreadsheet';
  return 'File Attachment';
}

interface MessageAttachmentProps {
  url: string;
  isSentByMe?: boolean;
}

export function MessageAttachment({ url, isSentByMe = false }: MessageAttachmentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isImg = isImageAttachment(url);
  const fileName = getAttachmentFileName(url);
  const fileTypeLabel = getFileTypeLabel(url);

  // Close lightbox on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLightboxOpen(false);
    }
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, handleKeyDown]);

  if (isImg) {
    return (
      <>
        {/* Chat Image Card */}
        <div className="group relative w-65 xs:w-[300px] sm:w-85 max-w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-xs transition-shadow hover:shadow-md">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative block w-full aspect-4/3 cursor-zoom-in text-left focus:outline-none"
            aria-label={`View full image ${fileName}`}
          >
            <Image
              src={url}
              alt={fileName}
              fill
              sizes="(max-width: 640px) 280px, 340px"
              className="object-cover transition-transform duration-200 group-hover:scale-102"
              unoptimized
            />

            {/* Hover Gradient & Action Buttons */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <span
                  title="Expand image"
                  className="flex size-8 items-center justify-center rounded-full bg-black/60 text-white shadow-xs backdrop-blur-xs transition-transform hover:scale-105"
                >
                  <Maximize2 className="size-4" />
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                <span className="truncate font-nunito text-xs font-semibold drop-shadow-xs">
                  {fileName}
                </span>
                <span className="flex items-center gap-1 font-manrope text-[11px] opacity-90">
                  <Maximize2 className="size-3" /> Click to view
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image Preview"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Modal Top Bar */}
            <header
              className="flex w-full max-w-4xl items-center justify-between pb-3 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="truncate font-nunito text-sm sm:text-base font-semibold text-white/90">
                {fileName}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  download={fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 font-nunito text-xs font-semibold text-white transition-colors hover:bg-white/25"
                  title="Download Image"
                >
                  <Download className="size-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
                  title="Open in new tab"
                >
                  <ExternalLink className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
                  aria-label="Close image preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </header>

            {/* Modal Main Image */}
            <div
              className="relative flex max-h-[82vh] max-w-[92vw] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Using standard img for full-fidelity modal rendering */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={fileName} className="max-h-[82vh] max-w-[92vw] object-contain" />
            </div>
          </div>
        )}
      </>
    );
  }

  // Non-Image Document / PDF Card
  return (
    <div
      className={`flex w-65 xs:w-[300px] sm:w-85 max-w-full items-center gap-3 rounded-xl border p-3 shadow-xs transition-shadow hover:shadow-sm ${
        isSentByMe
          ? 'border-white/20 bg-white/10 text-white'
          : 'border-[#e8ebe8] bg-white text-[#263238]'
      }`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
          isSentByMe ? 'bg-white/20 text-white' : 'bg-[#eaf4f2] text-[#2f7d7e]'
        }`}
      >
        <FileText className="size-5" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`truncate font-nunito text-xs font-bold leading-tight ${
            isSentByMe ? 'text-white' : 'text-[#263238]'
          }`}
          title={fileName}
        >
          {fileName}
        </span>
        <span
          className={`font-manrope text-[10px] ${isSentByMe ? 'text-white/80' : 'text-[#7d8488]'}`}
        >
          {fileTypeLabel}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex size-8 items-center justify-center rounded-md transition-colors ${
            isSentByMe ? 'text-white hover:bg-white/20' : 'text-[#2f7d7e] hover:bg-[#f0f7f5]'
          }`}
          aria-label={`Open ${fileName}`}
          title="Open in new tab"
        >
          <ExternalLink className="size-4" />
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download={fileName}
          className={`flex size-8 items-center justify-center rounded-md transition-colors ${
            isSentByMe ? 'text-white hover:bg-white/20' : 'text-[#2f7d7e] hover:bg-[#f0f7f5]'
          }`}
          aria-label={`Download ${fileName}`}
          title="Download file"
        >
          <Download className="size-4" />
        </a>
      </div>
    </div>
  );
}
