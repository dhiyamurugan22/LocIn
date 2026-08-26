import { useState } from 'react'

const API = 'http://localhost:8080/api/users'

export default function App() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '', email: '', password: '', preferredLanguage: 'English'
  })
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setMessage('')

    const endpoint = mode === 'login' ? '/login' : '/register'
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : form

    try {
      const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || 'Something went wrong')
        return
      }

      setUser(data)
      setMessage(mode === 'login' ? 'Login successful!' : 'Registration successful!')
    } catch {
      setMessage('Backend is not reachable. Start Spring Boot first.')
    }
  }

  if (user) {
    return (
      <main className="container">
        <section className="card">
          <h1>Welcome, {user.name} 👋</h1>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Translation Language:</b> {user.preferredLanguage}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </section>
      </main>
    )
  }

  return (
    <main className="container">
      <section className="card">
        <h1>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <input name="name" placeholder="Full name" value={form.name}
              onChange={update} required />
          )}

          <input name="email" type="email" placeholder="Email"
            value={form.email} onChange={update} required />

          <input name="password" type="password" placeholder="Password"
            value={form.password} onChange={update} required />

          {mode === 'register' && (
            <select name="preferredLanguage" value={form.preferredLanguage} onChange={update}>
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option>Malayalam</option>
              <option>Kannada</option>
            </select>
          )}

          <button type="submit">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <button className="link" onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login')
          setMessage('')
        }}>
          {mode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </button>
      </section>
    </main>
  )
}
