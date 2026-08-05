'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface MessageSentModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

function MailIllustration() {
  return (
    <div className="relative h-14 w-14.5">
      <Image src="/Home/figma-contact-message-mail.svg" alt="" fill sizes="58px" />
      <div className="absolute left-3.25 top-3 size-8 overflow-hidden rounded-[10px]">
        <Image src="/Home/figma-contact-message-email.png" alt="" fill sizes="32px" />
        <div
          className="absolute inset-0 bg-[#F2B59F] mix-blend-multiply"
          style={{
            maskImage: 'url(/Home/figma-contact-message-email-color.png)',
            maskSize: '32px 32px',
          }}
        />
        <Image
          src="/Home/figma-contact-message-email-element.png"
          alt=""
          width={25}
          height={25}
          className="absolute left-[3.59px] top-[2.48px]"
        />
      </div>
    </div>
  );
}

export function MessageSentModal({ isOpen, onClose }: MessageSentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-120 max-w-[calc(100%-2rem)] gap-8 rounded-2xl border border-[#E8EBE8] bg-[#FCE9E3] p-6 text-[#263238] shadow-[0_60px_100px_rgba(16,45,97,0.08)] sm:max-w-220"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <MailIllustration />
          <DialogTitle className="w-70.5 font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
            Your Message Has Been Sent!
          </DialogTitle>
          <DialogDescription className="w-78 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
            Thank you for reaching out. Our team will review your message and respond within 24
            hours.
          </DialogDescription>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            onClick={() => onClose(false)}
            className="flex h-14 items-center justify-center rounded-[32px] border border-[#D5E5E5] bg-[#2F7D7E] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
          >
            Return to Home
          </Link>
          <Link
            href="/explore"
            onClick={() => onClose(false)}
            className="flex h-14 items-center justify-center rounded-[32px] border border-[#D4D6D7] bg-white px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094B]"
          >
            Explore Library
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MessageSentModal;
