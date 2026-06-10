import Admin from "@/components/admin";


export default function AdminPage() {
  return (
    <Admin.ProtectedRoute>
      <Admin.Dashboard />
    </Admin.ProtectedRoute>
  )
}