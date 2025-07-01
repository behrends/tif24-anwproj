import { AddLecturerDialog } from '@/components/lecturers/add-lecturer-dialog'

export default function LecturersPage() {
  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">👥 Dozierende</h1>
        <AddLecturerDialog />
      </div>
      <p className="text-muted-foreground">
        Hier wird die Dozierenden-Verwaltung implementiert (aus Wireframe
        #4). Der Dialog zum Hinzufügen entspricht Wireframe #5.
      </p>
    </div>
  )
}
