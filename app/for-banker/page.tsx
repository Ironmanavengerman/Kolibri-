import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function BankRegistration() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrera bank</CardTitle>
          <CardDescription>Skapa ett konto för din bank</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bankens namn</Label>
                <Input id="bankName" placeholder="Exempel Bank AB" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgNumber">Organisationsnummer</Label>
                <Input id="orgNumber" placeholder="XXXXXX-XXXX" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-postadress</Label>
                <Input id="email" type="email" placeholder="info@exempelbank.se" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Lösenord</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Registrera</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

