"use client";

import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="About tebuk">
          <Info size={13} />
        </button>
      </DialogTrigger>
      <DialogContent forceMount className="max-w-sm data-[state=closed]:hidden">
        <DialogHeader>
          <DialogTitle className="font-caveat text-3xl">tebuk.</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-gray-600 font-mono">
          <p>
            tebuk.app is a Quran memorization practice tool designed to help you build and maintain your hifz. <strong>Tebuk</strong> (Malay: &ldquo;to poke&rdquo;) is a well-known hifz revision technique where you randomly poke an ayah or verse and continue reciting from there, testing your memory without a running start.
          </p>
          <p>
            Pick a mode either by <strong>surah</strong>, <strong>page</strong>, or <strong>juz</strong> and get a random verse to recite from memory. Shuffle for a new one whenever you&apos;re ready.
          </p>
          <p>
            Use the reveal buttons to check the surah and page number after you recite, so you can test yourself without seeing the answer first.
          </p>
          <p className="text-gray-400 text-xs pt-1">
            Built by <a href="https://pixelmindstudio.co" className="underline underline-offset-2 hover:text-gray-600" target="_blank" rel="noopener noreferrer">Pixelmind Studio</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
