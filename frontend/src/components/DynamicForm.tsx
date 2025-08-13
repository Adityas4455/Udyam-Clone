import { useState } from 'react'

interface Field {
  name: string
  label: string
  type: string
  pattern?: string
  placeholder?: string
  required?: boolean
}

interface Props {
  schema: Field[]
}

export default function DynamicForm({ schema }: Props) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let newErrors: { [key: string]: string } = {}
    schema.forEach((field) => {
      const value = formData[field.name] || ''
      if (field.required && !value) {
        newErrors[field.name] = 'This field is required'
      } else if (field.pattern && !new RegExp(field.pattern).test(value)) {
        newErrors[field.name] = 'Invalid format'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form Data:', formData)
      alert('Form submitted successfully!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field) => (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  )
}