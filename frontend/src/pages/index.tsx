import DynamicForm from '@/components/DynamicForm'
import formSchema from '@/lib/schema'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Udyam Registration (Step 1 & 2)</h1>
        <DynamicForm schema={formSchema} />
      </div>
    </main>
  )
}