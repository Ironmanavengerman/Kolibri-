"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeedPreviewModal } from "./deed-preview-modal";
import { ReminderConfirmationModal } from "./reminder-confirmation-modal";
import { DeedAdjustmentModal } from "./deed-adjustment-modal";
import { Check, Bell, Edit, Eye } from "lucide-react";

type Deed = {
  id: string;
  förening: string;
  lägenhetsnummer: string;
  pantnummer: string;
  incomingDate: string;
  status:
    | "Väntar på signering"
    | "Påminnelse behövs"
    | "Justering krävs"
    | "Klar för signering";
  action: "Signera" | "Påminn" | "Justera" | "Granska";
  currentDraft?: string;
  feedback?: string;
};

const deeds: Deed[] = [
  {
    id: "1",
    förening: "Brf Solsidan",
    lägenhetsnummer: "1201",
    pantnummer: "12345",
    incomingDate: "2024-11-15",
    status: "Klar för signering",
    action: "Signera",
  },
  {
    id: "2",
    förening: "Brf Havsutsikten",
    lägenhetsnummer: "0502",
    pantnummer: "67890",
    incomingDate: "2024-11-16",
    status: "Väntar på signering",
    action: "Påminn",
  },
  {
    id: "3",
    förening: "Brf Skogsgläntan",
    lägenhetsnummer: "0301",
    pantnummer: "24680",
    incomingDate: "2024-11-17",
    status: "Justering krävs",
    action: "Justera",
    currentDraft: "Detta är det nuvarande utkastet för inteckningen...",
    feedback:
      "Vänligen kontrollera beloppen och datumen. Det finns några diskrepanser som behöver åtgärdas.",
  },
  {
    id: "4",
    förening: "Brf Stadskärnan",
    lägenhetsnummer: "1102",
    pantnummer: "13579",
    incomingDate: "2024-11-18",
    status: "Påminnelse behövs",
    action: "Påminn",
  },
  {
    id: "5",
    förening: "Brf Björkbacken",
    lägenhetsnummer: "0703",
    pantnummer: "97531",
    incomingDate: "2024-11-19",
    status: "Klar för signering",
    action: "Signera",
  },
];

export function DeedList() {
  const [selectedDeed, setSelectedDeed] = useState<Deed | null>(null);
  const [reminderDeed, setReminderDeed] = useState<Deed | null>(null);
  const [adjustmentDeed, setAdjustmentDeed] = useState<Deed | null>(null);

  const handleAction = (deed: Deed) => {
    if (deed.action === "Signera") {
      setSelectedDeed(deed);
    } else if (deed.action === "Påminn") {
      setReminderDeed(deed);
    } else if (deed.action === "Justera") {
      setAdjustmentDeed(deed);
    } else {
      console.log(`Action ${deed.action} for deed ${deed.id}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedDeed(null);
  };

  const handleSign = () => {
    console.log(`Deed ${selectedDeed?.id} signed successfully`);
    setSelectedDeed(null);
    // Here you would typically update the deed's status in your state or backend
  };

  const handleCloseReminderModal = () => {
    setReminderDeed(null);
  };

  const handleSendReminder = () => {
    console.log(`Reminder sent for deed ${reminderDeed?.id}`);
    setReminderDeed(null);
    // Here you would typically send the reminder and update the deed's status
  };

  const handleCloseAdjustmentModal = () => {
    setAdjustmentDeed(null);
  };

  const handleSaveAdjustments = (adjustments: string) => {
    console.log(
      `Adjustments saved for deed ${adjustmentDeed?.id}:`,
      adjustments
    );
    // Here you would typically save the adjustments and update the deed's status
  };

  const getButtonProps = (action: Deed["action"]) => {
    switch (action) {
      case "Signera":
        return {
          variant: "default" as const,
          icon: Check,
          className: "bg-green-500 hover:bg-green-600 text-white",
        };
      case "Påminn":
        return {
          variant: "secondary" as const,
          icon: Bell,
          className: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      case "Justera":
        return {
          variant: "destructive" as const,
          icon: Edit,
          className: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "Granska":
        return {
          variant: "outline" as const,
          icon: Eye,
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      default:
        return {
          variant: "default" as const,
          icon: Check,
          className: "",
        };
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Förening</TableHead>
              <TableHead>Lägenhetsnummer</TableHead>
              <TableHead>Pantnummer</TableHead>
              <TableHead>Inkommande datum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Åtgärd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deeds.map((deed) => (
              <TableRow key={deed.id}>
                <TableCell>{deed.förening}</TableCell>
                <TableCell>{deed.lägenhetsnummer}</TableCell>
                <TableCell>{deed.pantnummer}</TableCell>
                <TableCell>{deed.incomingDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      deed.status === "Klar för signering"
                        ? "default"
                        : deed.status === "Väntar på signering"
                        ? "secondary"
                        : deed.status === "Påminnelse behövs"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {deed.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAction(deed)}
                    size="sm"
                    {...getButtonProps(deed.action)}
                  >
                    {React.createElement(getButtonProps(deed.action).icon, {
                      className: "mr-2 h-4 w-4",
                    })}
                    {deed.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedDeed && (
        <DeedPreviewModal
          isOpen={!!selectedDeed}
          onClose={handleCloseModal}
          onSign={handleSign}
          deedData={{
            förening: selectedDeed.förening,
            lägenhetsnummer: selectedDeed.lägenhetsnummer,
            pantnummer: selectedDeed.pantnummer,
            incomingDate: selectedDeed.incomingDate,
          }}
        />
      )}
      {reminderDeed && (
        <ReminderConfirmationModal
          isOpen={!!reminderDeed}
          onClose={handleCloseReminderModal}
          onConfirm={handleSendReminder}
          deedData={{
            förening: reminderDeed.förening,
            lägenhetsnummer: reminderDeed.lägenhetsnummer,
            incomingDate: reminderDeed.incomingDate,
          }}
        />
      )}
      {adjustmentDeed && (
        <DeedAdjustmentModal
          isOpen={!!adjustmentDeed}
          onClose={handleCloseAdjustmentModal}
          onSave={handleSaveAdjustments}
          deedData={{
            förening: adjustmentDeed.förening,
            lägenhetsnummer: adjustmentDeed.lägenhetsnummer,
            pantnummer: adjustmentDeed.pantnummer,
            incomingDate: adjustmentDeed.incomingDate,
            currentDraft: adjustmentDeed.currentDraft || "",
            feedback: adjustmentDeed.feedback || "",
          }}
        />
      )}
    </>
  );
}
