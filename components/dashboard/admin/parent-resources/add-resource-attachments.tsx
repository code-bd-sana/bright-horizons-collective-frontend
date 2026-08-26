'use client';

import { Download, FileText, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { ResourceFormStepper } from './resource-form-stepper';
import { ResourceFormNavigation } from './resource-form-navigation';

const acceptedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
] as const;

const maximumFileSize = 10 * 1024 * 1024;

function isAcceptedFile(file: File) {
  return acceptedFileTypes.includes(file.type as (typeof acceptedFileTypes)[number]);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AddResourceAttachments() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  function addFiles(files: FileList | File[]) {
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > maximumFileSize) {
        toast.error(`“${file.name}” is larger than the 10MB file limit.`);
        return false;
      }

      if (!isAcceptedFile(file)) {
        toast.error(`“${file.name}” is not a supported attachment type.`);
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    setAttachments((currentAttachments) => {
      const knownFiles = new Set(
        currentAttachments.map((file) => `${file.name}-${file.size}-${file.lastModified}`)
      );
      const additions = validFiles.filter(
        (file) => !knownFiles.has(`${file.name}-${file.size}-${file.lastModified}`)
      );
      return [...currentAttachments, ...additions];
    });
  }

  function saveAttachments() {
    toast.success(
      attachments.length
        ? `${attachments.length} attachment${attachments.length === 1 ? '' : 's'} saved.`
        : 'Attachments saved.'
    );
  }

  return (
    <section className="mx-auto w-full max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={3} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">3. Attachments</h2>

        <div className="mt-5 space-y-5">
          <p className="max-w-179.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
            Upload downloadable files (PDFs, printable worksheets, checklists, activity sheets) that
            parents can access from this resource.
          </p>

          <div
            className={`rounded-[14px] border-2 border-dashed px-4 py-8 text-center transition-colors sm:px-8 ${isDragging ? 'border-[#2f7d7e] bg-[#edf6f2]' : 'border-[#e7eceb] bg-white'}`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              addFiles(event.dataTransfer.files);
            }}
          >
            <Download
              aria-hidden="true"
              className="mx-auto size-6 text-[#b0bec5]"
              strokeWidth={1.7}
            />
            <p className="mt-3 font-manrope text-sm leading-5.25 text-[#607d8b]">
              Drag &amp; drop files here, or{' '}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-semibold text-[#2f7d7e] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
              >
                browse to upload
              </button>
            </p>
            <p className="mt-1.5 font-manrope text-xs leading-4.5 text-[#b0bec5]">
              Supported: PDF, DOCX, XLSX, PNG, JPG · Max 10MB per file
            </p>
            <input
              ref={inputRef}
              accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
              className="sr-only"
              multiple
              type="file"
              onChange={(event) => {
                if (event.target.files) addFiles(event.target.files);
                event.target.value = '';
              }}
            />
          </div>

          {attachments.length > 0 && (
            <ul className="divide-y divide-[#e7eceb] overflow-hidden rounded-[14px] border border-[#e7eceb]">
              {attachments.map((file) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="flex items-center gap-3 p-3"
                >
                  <FileText aria-hidden="true" className="size-4 shrink-0 text-[#2f7d7e]" />
                  <span className="min-w-0 flex-1 truncate font-manrope text-sm text-[#263238]">
                    {file.name}
                  </span>
                  <span className="shrink-0 font-manrope text-xs text-[#607d8b]">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() =>
                      setAttachments((currentAttachments) =>
                        currentAttachments.filter((attachment) => attachment !== file)
                      )
                    }
                    className="flex size-7 shrink-0 items-center justify-center rounded-[10px] text-[#607d8b] hover:bg-[#edf6f2] hover:text-[#2f7d7e] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
                  >
                    <X aria-hidden="true" size={15} strokeWidth={1.8} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ResourceFormNavigation
        currentStep={3}
        onNext={saveAttachments}
        onSaveChanges={saveAttachments}
      />
    </section>
  );
}
