'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

export default function LantagareLogin() {
  const [personalNumber, setPersonalNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleBankIDLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate BankID authentication process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert('BankID inloggning simulerad. I en riktig implementation skulle detta ansluta till BankID API.')
  }

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Låntagare inloggning</CardTitle>
          <CardDescription>Logga in med BankID för att hantera dina inteckningar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBankIDLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personalNumber">Personnummer</Label>
                <Input 
                  id="personalNumber" 
                  placeholder="ÅÅÅÅMMDD-XXXX" 
                  value={personalNumber}
                  onChange={(e) => setPersonalNumber(e.target.value)}
                  required 
                />
              </div>
            </div>
            <CardFooter className="px-0 pt-6">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loggar in...
                  </>
                ) : (
                  'Logga in med BankID'
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

