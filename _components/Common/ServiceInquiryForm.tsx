'use client'

import { useState } from 'react'

export default function ContactFormWhite() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(
        'https://backend.octaevents.com/api/forms/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      if (res.ok) {
        setSuccess(true)
        setForm({
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          message: '',
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-[28px] p-8 md:p-12 max-w-[720px] mx-auto">
      <h2 className="text-center text-4xl font-monument font-extrabold text-primary mb-8">
        Request Quote
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label className="field-label">First Name</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <div className="field">
            <label className="field-label">Last Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Enter Phone Number</label>
          <div className="flex items-center gap-3">
            <span className="text-lg">🇪🇬 +20</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Enter Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="field-input"
            required
          />
        </div>

        <div className="field">
          <label className="field-label">
            Leave a Message <span className="italic">(Optional)</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="field-input resize-none h-32"
          />
        </div>

        <button
          disabled={loading}
          className="
            w-full
            bg-secondary
            text-primary
            font-semibold
            py-4
            rounded-full
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>

        {success && (
          <p className="text-green-600 text-center font-medium">
            Your inquiry has been sent successfully.
          </p>
        )}
      </form>
    </div>
  )
}
