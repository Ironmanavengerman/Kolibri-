"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle, Plus, Minus, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCheckbox } from "@/components/animated-checkbox";

interface Person {
  id: number;
  name: string;
  personalNumber: string;
  email: string;
}

interface BoardMember extends Person {
  role: string;
}

interface Borrower extends Person {
  loanPercentage: string;
  apartmentShare: string;
}

interface DraftData {
  managers: Person[];
  boardMembers: BoardMember[];
  borrowers: Borrower[];
  isRegistreringsbevisOk: boolean;
  isFullmaktOk: boolean;
}

// Add new imports for API types
interface DeedFormDTO {
  date: string;
  association: AssociationInputDTO;
  apartment: ApartmentDTO;
  town: string;
  postalCode: string;
  signees: SigneeInputDTO[];
  trustees: SigneeInputDTO[];
  trustee: string;
  creditNumber: string;
}

interface AssociationInputDTO {
  name: string;
  organisationNumber: string;
  town: string;
  postalCode: string;
  address: string;
}

interface ApartmentDTO {
  address: string;
  apartmentNumber: string;
  fourDigitNumber: string;
}

interface SigneeInputDTO {
  name: string;
  personNr: string;
  email: string;
  percentageLoan: number;
  percentageOwnership: number;
}

export default function SkapaPantbrev() {
  const [isRegistreringsbevisOk, setIsRegistreringsbevisOk] = useState(false);
  const [isFullmaktOk, setIsFullmaktOk] = useState(false);
  const [isFullmaktMatched, setIsFullmaktMatched] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRegistreringsbevisDialogOpen, setIsRegistreringsbevisDialogOpen] =
    useState(false);
  const [isFullmaktDialogOpen, setIsFullmaktDialogOpen] = useState(false);
  const [autofillBoardData, setAutofillBoardData] = useState(false);
  const [managers, setManagers] = useState<Person[]>([
    { id: 1, name: "", personalNumber: "", email: "" },
  ]);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([
    { id: 1, role: "", name: "", personalNumber: "", email: "" },
  ]);
  const [borrowers, setBorrowers] = useState<Borrower[]>([
    {
      id: 1,
      name: "",
      personalNumber: "",
      email: "",
      loanPercentage: "",
      apartmentShare: "",
    },
  ]);
  const [isAnimating, setIsAnimating] = useState<boolean | "completed">(false);
  const [date, setDate] = useState("");
  const [creditNumber, setCreditNumber] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [associationAddress, setAssociationAddress] = useState("");
  const [town, setTown] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [apartmentAddress, setApartmentAddress] = useState("");
  const [fourDigitNumber, setFourDigitNumber] = useState("");
  const [trustee, setTrustee] = useState("");

  useEffect(() => {
    const savedDraft = localStorage.getItem("pantbrevDraft");
    if (savedDraft) {
      const parsedDraft: DraftData = JSON.parse(savedDraft);
      setManagers(parsedDraft.managers);
      setBoardMembers(parsedDraft.boardMembers);
      setBorrowers(parsedDraft.borrowers);
      setIsRegistreringsbevisOk(parsedDraft.isRegistreringsbevisOk);
      setIsFullmaktOk(parsedDraft.isFullmaktOk);
    }
  }, []);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const addPerson = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    personType: string
  ) => {
    setter((prev) => {
      const newId = Math.max(...prev.map((p) => p.id), 0) + 1;
      const newPerson = { id: newId, name: "", personalNumber: "", email: "" };
      if (personType === "boardMember") {
        return [...prev, { ...newPerson, role: "" }];
      } else if (personType === "borrower") {
        return [
          ...prev,
          { ...newPerson, loanPercentage: "", apartmentShare: "" },
        ];
      }
      return [...prev, newPerson];
    });
  };

  const removePerson = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    id: number
  ) => {
    setter((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePerson = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    id: number,
    field: string,
    value: string
  ) => {
    setter((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleRegistreringsbevis = () => {
    setIsRegistreringsbevisDialogOpen(true);
  };

  const handleConfirmRegistreringsbevis = () => {
    console.log("Downloading and saving registreringsbevis...");

    if (autofillBoardData) {
      const mockBoardData: BoardMember[] = [
        {
          id: 1,
          role: "Ordförande",
          name: "Anna Andersson",
          personalNumber: "750815-1234",
          email: "anna.andersson@example.com",
        },
        {
          id: 2,
          role: "Styrelseledamot",
          name: "Björn Bergström",
          personalNumber: "820620-5678",
          email: "bjorn.bergstrom@example.com",
        },
        {
          id: 3,
          role: "Styrelseledamot",
          name: "Cecilia Carlsson",
          personalNumber: "790404-9012",
          email: "cecilia.carlsson@example.com",
        },
      ];

      setBoardMembers(mockBoardData);
    }

    setIsRegistreringsbevisOk(true);
    setIsRegistreringsbevisDialogOpen(false);

    // Toggle Fullmakt status every 2 times
    setIsFullmaktMatched((prev) => !prev);
  };

  const handleSaveDraft = () => {
    const draft: DraftData = {
      managers,
      boardMembers,
      borrowers,
      isRegistreringsbevisOk,
      isFullmaktOk,
    };
    localStorage.setItem("pantbrevDraft", JSON.stringify(draft));
    alert(
      "Ditt utkast har sparats och kommer att finnas tillgängligt nästa gång du öppnar sidan."
    );
  };

  const handleSendDocument = async () => {
    try {
      console.log("Starting handleSendDocument");
      setIsAnimating(true);

      const token = localStorage.getItem("token");
      console.log("Got token:", token ? "Token exists" : "No token found");

      if (!token) {
        throw new Error("Ingen token hittades. Vänligen logga in igen.");
      }

      // Transform borrowers to signees format
      const signees = borrowers.map((borrower) => ({
        name: borrower.name,
        personNr: borrower.personalNumber,
        email: borrower.email,
        percentageLoan: parseFloat(borrower.loanPercentage) || 0,
        percentageOwnership: parseFloat(borrower.apartmentShare) || 0,
      }));
      console.log("Transformed signees:", signees);

      // Transform board members to trustees format
      const trustees = boardMembers.map((member) => ({
        name: member.name,
        personNr: member.personalNumber,
        email: member.email,
        percentageLoan: 0,
        percentageOwnership: 0,
      }));
      console.log("Transformed trustees:", trustees);

      const deedFormData: DeedFormDTO = {
        date,
        association: {
          name: associationName,
          organisationNumber: orgNumber,
          town,
          postalCode,
          address: associationAddress,
        },
        apartment: {
          address: apartmentAddress,
          apartmentNumber,
          fourDigitNumber,
        },
        town,
        postalCode,
        signees,
        trustees,
        trustee: managers[0]?.name || "",
        creditNumber,
      };

      console.log("Prepared deedFormData:", deedFormData);
      
      const response = await fetch("http://localhost:4000/deed/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          form: deedFormData,
          formId: null,
        }),
      });

      console.log("Got response from backend:", response);

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        throw new Error("Din session har gått ut. Vänligen logga in igen.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || "Kunde inte skapa pantbrev");
      }

      const result = await response.json();
      console.log("Parsed response:", result);

      if (result.result === "ACCEPTED") {
        setIsAnimating("completed");
        setTimeout(() => {
          setIsAnimating(false);
          alert("Ditt pantbrev har skickats framgångsrikt.");
        }, 2000);
      } else {
        throw new Error(result.message || "Kunde inte skapa pantbrev");
      }
    } catch (error: unknown) {
      console.error("Error in handleSendDocument:", error);
      setIsAnimating(false);
      const errorMessage = error instanceof Error ? error.message : "Ett okänt fel uppstod";
      
      if (errorMessage.includes("session har gått ut") || errorMessage.includes("token")) {
        window.location.href = "/login";
        return;
      }
      
      alert(`Ett fel uppstod: ${errorMessage}`);
    }
  };

  return (
    <div className="p-8 space-y-8 relative">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Nytt Pantbrev</h1>
        <p className="text-muted-foreground">
          Skapa en ny pantbrevsregistrering
        </p>
      </header>

      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Grundläggande Information</CardTitle>
          <p className="text-muted-foreground">
            Ange grundläggande uppgifter för pantbrevet
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="date">Dagens datum</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="credit-number">Kreditnummer</Label>
            <Input
              id="credit-number"
              placeholder="Ange kreditnummer"
              value={creditNumber}
              onChange={(e) => setCreditNumber(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Housing Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Bostad</CardTitle>
          <p className="text-muted-foreground">
            Ange fastighets- och föreningsuppgifter
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <Label htmlFor="org-number">BRF Organisationsnummer</Label>
                <Input
                  id="org-number"
                  placeholder="7xxxx-xxxx"
                  className="w-full"
                  value={orgNumber}
                  onChange={(e) => setOrgNumber(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className={`transition-colors duration-300 ${
                  isRegistreringsbevisOk
                    ? "bg-green-100 hover:bg-green-200 text-green-700"
                    : "bg-red-100 hover:bg-red-200 text-red-700"
                }`}
                onClick={handleRegistreringsbevis}
              >
                Hämta Registreringsbevis
              </Button>
            </div>
            <div>
              <Label htmlFor="association-name">Föreningens namn</Label>
              <Input
                id="association-name"
                placeholder="Bostadsrättsföreningen Albertina"
                value={associationName}
                onChange={(e) => setAssociationName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="association-address">Föreningens Adress</Label>
              <Input
                id="association-address"
                placeholder="Engelbrektsgatan 18"
                value={associationAddress}
                onChange={(e) => setAssociationAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postal-code">Postnummer</Label>
              <Input
                id="postal-code"
                placeholder="11432"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="town">Ort</Label>
              <Input
                id="town"
                placeholder="Stockholm"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="apartment-number">Lägenhetsnummer</Label>
              <Input
                id="apartment-number"
                placeholder="1234"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="apartment-address">Lägenhetsadress</Label>
              <Input
                id="apartment-address"
                placeholder="Lägenhet 2"
                value={apartmentAddress}
                onChange={(e) => setApartmentAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="four-digit-number">Fyrsiffrigt nummer</Label>
              <Input
                id="four-digit-number"
                placeholder="1234"
                value={fourDigitNumber}
                onChange={(e) => setFourDigitNumber(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Economic Managers Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Föreningens ekonomiska förvaltare</CardTitle>
            <p className="text-muted-foreground">
              Uppgifter om föreningens ekonomiska förvaltning
            </p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0 items-center">
            <AnimatedCheckbox checked={isFullmaktMatched} />
            <Button
              variant={isFullmaktMatched ? "outline" : "secondary"}
              className={`transition-colors duration-300 ${
                isFullmaktMatched
                  ? "bg-green-100 hover:bg-green-200 text-green-700"
                  : ""
              }`}
              onClick={() =>
                isFullmaktMatched
                  ? setIsFullmaktOk(!isFullmaktOk)
                  : setIsFullmaktDialogOpen(true)
              }
            >
              {isFullmaktMatched ? "Fullmakt" : "Hämta Fullmakt"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {managers.map((manager, index) => (
            <div
              key={manager.id}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4 pb-4 border-b last:border-b-0"
            >
              <div>
                <Label htmlFor={`manager-name-${manager.id}`}>Namn</Label>
                <Input
                  id={`manager-name-${manager.id}`}
                  placeholder="Jane Edgren"
                  value={manager.name}
                  onChange={(e) => {
                    updatePerson(
                      setManagers,
                      manager.id,
                      "name",
                      e.target.value
                    );
                    if (index === 0) {
                      setTrustee(e.target.value);
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`manager-personal-number-${manager.id}`}>
                  Personnummer
                </Label>
                <Input
                  id={`manager-personal-number-${manager.id}`}
                  placeholder="610414-9023"
                  value={manager.personalNumber}
                  onChange={(e) =>
                    updatePerson(
                      setManagers,
                      manager.id,
                      "personalNumber",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`manager-email-${manager.id}`}>Email</Label>
                <Input
                  id={`manager-email-${manager.id}`}
                  placeholder="jane.edgren@mailinator.com"
                  value={manager.email}
                  onChange={(e) =>
                    updatePerson(
                      setManagers,
                      manager.id,
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
              {index > 0 && (
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    onClick={() => removePerson(setManagers, manager.id)}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Ta bort
                  </Button>
                </div>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addPerson(setManagers, "manager")}
          >
            <Plus className="mr-2 h-4 w-4" /> Lägg till förvaltare
          </Button>
        </CardContent>
      </Card>

      {/* Board Members Card */}
      <Card>
        <CardHeader>
          <CardTitle>Föreningens styrelse</CardTitle>
          <p className="text-muted-foreground">
            Uppgifter om föreningens styrelse
          </p>
        </CardHeader>
        <CardContent>
          {boardMembers.map((member, index) => (
            <div
              key={member.id}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4 pb-4 border-b last:border-b-0"
            >
              <div>
                <Label htmlFor={`board-role-${member.id}`}>Roll</Label>
                <Input
                  id={`board-role-${member.id}`}
                  placeholder={index === 0 ? "Ordförande" : "Styrelseledamot"}
                  value={member.role}
                  onChange={(e) =>
                    updatePerson(
                      setBoardMembers,
                      member.id,
                      "role",
                      e.target.value
                    )
                  }
                />
              </div>
              {isRegistreringsbevisOk && (
                <div>
                  <Label htmlFor={`board-name-${member.id}`}>Namn</Label>
                  <Input
                    id={`board-name-${member.id}`}
                    placeholder="Anna Andersson"
                    value={member.name}
                    onChange={(e) =>
                      updatePerson(
                        setBoardMembers,
                        member.id,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
              <div>
                <Label htmlFor={`board-personal-number-${member.id}`}>
                  Personnummer
                </Label>
                <Input
                  id={`board-personal-number-${member.id}`}
                  placeholder="750815-1234"
                  value={member.personalNumber}
                  onChange={(e) =>
                    updatePerson(
                      setBoardMembers,
                      member.id,
                      "personalNumber",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`board-email-${member.id}`}>Email</Label>
                <Input
                  id={`board-email-${member.id}`}
                  placeholder="anna.andersson@example.com"
                  value={member.email}
                  onChange={(e) =>
                    updatePerson(
                      setBoardMembers,
                      member.id,
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
              {index > 0 && (
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    onClick={() => removePerson(setBoardMembers, member.id)}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Ta bort
                  </Button>
                </div>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addPerson(setBoardMembers, "boardMember")}
          >
            <Plus className="mr-2 h-4 w-4" /> Lägg till styrelsemedlem
          </Button>
        </CardContent>
      </Card>

      {/* Borrowers Card */}
      <Card>
        <CardHeader>
          <CardTitle>Låntagare och ägare</CardTitle>
          <p className="text-muted-foreground">
            Lägg till alla låntagare och deras ägaruppgifter
          </p>
        </CardHeader>
        <CardContent>
          {borrowers.map((borrower, index) => (
            <div
              key={borrower.id}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4 pb-4 border-b last:border-b-0"
            >
              <div>
                <Label htmlFor={`borrower-name-${borrower.id}`}>Namn</Label>
                <Input
                  id={`borrower-name-${borrower.id}`}
                  placeholder="Ange namn"
                  value={borrower.name}
                  onChange={(e) =>
                    updatePerson(
                      setBorrowers,
                      borrower.id,
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`borrower-personal-number-${borrower.id}`}>
                  Personnummer
                </Label>
                <Input
                  id={`borrower-personal-number-${borrower.id}`}
                  placeholder="ÅÅÅÅMMDD-XXXX"
                  value={borrower.personalNumber}
                  onChange={(e) =>
                    updatePerson(
                      setBorrowers,
                      borrower.id,
                      "personalNumber",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`borrower-email-${borrower.id}`}>Email</Label>
                <Input
                  id={`borrower-email-${borrower.id}`}
                  type="email"
                  placeholder="email@exempel.com"
                  value={borrower.email}
                  onChange={(e) =>
                    updatePerson(
                      setBorrowers,
                      borrower.id,
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`borrower-loan-percentage-${borrower.id}`}>
                  Procent av lånet
                </Label>
                <Input
                  id={`borrower-loan-percentage-${borrower.id}`}
                  type="number"
                  placeholder="0"
                  value={borrower.loanPercentage}
                  onChange={(e) =>
                    updatePerson(
                      setBorrowers,
                      borrower.id,
                      "loanPercentage",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`borrower-apartment-share-${borrower.id}`}>
                  Andel av lägenhet
                </Label>
                <Input
                  id={`borrower-apartment-share-${borrower.id}`}
                  type="number"
                  placeholder="0"
                  value={borrower.apartmentShare}
                  onChange={(e) =>
                    updatePerson(
                      setBorrowers,
                      borrower.id,
                      "apartmentShare",
                      e.target.value
                    )
                  }
                />
              </div>
              {index > 0 && (
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    onClick={() => removePerson(setBorrowers, borrower.id)}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Ta bort
                  </Button>
                </div>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addPerson(setBorrowers, "borrower")}
          >
            <Plus className="mr-2 h-4 w-4" /> Lägg till låntagare
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={handleSaveDraft}>
          Spara Utkast
        </Button>
        <Button onClick={handlePreview}>Förhandsgranska</Button>
        <Button
          onClick={() => {
            console.log("Send button clicked");
            handleSendDocument();
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
          disabled={isAnimating !== false}
        >
          <Send className="mr-2 h-4 w-4" /> Skicka
        </Button>
      </div>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
            >
              {isAnimating === true ? (
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-20, 20, -20] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <Send className="w-16 h-16 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </motion.div>
              )}
              <p className="text-center mt-4 text-lg font-semibold">
                {isAnimating === true
                  ? "Skickar dokument..."
                  : "Dokument skickat!"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Förhandsgranskning av Pantbrev</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <p>Här visas en förhandsgranskning av hela pantbrevet.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRegistreringsbevisDialogOpen}
        onOpenChange={setIsRegistreringsbevisDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hämta Registreringsbevis</DialogTitle>
            <DialogDescription>
              Registreringsbeviset kommer att laddas ner och sparas i en mapp
              för föreningen.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autofill"
              checked={autofillBoardData}
              onCheckedChange={(checked) =>
                setAutofillBoardData(checked as boolean)
              }
            />
            <label
              htmlFor="autofill"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Autofyll styrelseuppgifter från registreringsbeviset
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRegistreringsbevisDialogOpen(false)}
            >
              Avbryt
            </Button>
            <Button onClick={handleConfirmRegistreringsbevis}>Bekräfta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isFullmaktDialogOpen}
        onOpenChange={setIsFullmaktDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Begäran om ny fullmakt</DialogTitle>
            <DialogDescription>
              Här kan du begära en ny fullmakt för föreningens ekonomiska
              förvaltare.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p>
              Vill du skicka en begäran om ny fullmakt till föreningens
              ekonomiska förvaltare?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFullmaktDialogOpen(false)}
            >
              Avbryt
            </Button>
            <Button
              onClick={() => {
                alert(
                  "En begäran om ny fullmakt har skickats till föreningens ekonomiska förvaltare."
                );
                setIsFullmaktDialogOpen(false);
              }}
            >
              Skicka begäran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
