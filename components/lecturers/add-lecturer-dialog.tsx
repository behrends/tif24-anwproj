"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AddLecturerDialog() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<"internal" | "external">("external")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">➕ Hinzufügen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue*n Dozent*in hinzufügen</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titel (optional)</Label>
              <select
                id="title"
                className="mt-1 h-10 w-full rounded-md border px-3 py-2 text-sm"
                defaultValue=""
              >
                <option value="">--</option>
                <option value="Prof.">Prof.</option>
                <option value="Prof. Dr.">Prof. Dr.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div>
              <Label htmlFor="firstname">Vorname*</Label>
              <Input id="firstname" placeholder="Anna" />
            </div>
          </div>

          <div>
            <Label htmlFor="lastname">Nachname*</Label>
            <Input id="lastname" placeholder="Schmidt" />
          </div>

          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" placeholder="schmidt@dhbw.de" />
          </div>

          <div className="space-y-2">
            <p className="font-medium">Kategorie</p>
            <RadioGroup
              value={category}
              onValueChange={(val) => setCategory(val as "internal" | "external")}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="internal" />
                Intern (DHBW Mitarbeiter*in)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="external" />
                Extern (Lehrbeauftragte*r)
              </label>
            </RadioGroup>
          </div>

          {category === "external" && (
            <div>
              <Label htmlFor="limit">Stundenkapazität (Jahresgrenze)</Label>
              <div className="flex items-center gap-2">
                <Input id="limit" type="number" placeholder="240" className="w-32" />
                <span>h</span>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="expertise">Fachgebiete (optional)</Label>
            <Input
              id="expertise"
              placeholder="Marketing, BWL Grundlagen, Controlling"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notizen (optional)</Label>
            <Textarea id="notes" placeholder="Expertise in digitalem Marketing..." />
          </div>
        </form>
        <DialogFooter className="mt-4">
          <Button>💾 Speichern</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            ❌ Abbrechen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
