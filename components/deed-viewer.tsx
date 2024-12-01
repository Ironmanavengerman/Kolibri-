"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Deed {
  id: string
  name: string
  date: string
  signatories: string[]
}

interface DeedViewerProps {
  deed: Deed
  onClose: () => void
}

export function DeedViewer({ deed, onClose }: DeedViewerProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{deed.name} - Mortgage Deed</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Details:</h3>
          <p><strong>Date:</strong> {deed.date}</p>
          <p><strong>Signatories:</strong> {deed.signatories.join(", ")}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Deed Content:</h3>
          <div className="border p-4 h-96 overflow-y-auto">
            {/* In a real application, you would render the actual PDF content here */}
            <p>This is where the actual content of the mortgage deed would be displayed. In a production environment, you would integrate a PDF viewer library like react-pdf or pdf.js to render the actual PDF content.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

