import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string
      password: string
    }

    if (!email || !password) {
      return HttpResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    if (email === 'server@error.com') {
      return HttpResponse.json({ message: 'Server error' }, { status: 500 })
    }

    if (email === 'ratelimit@ex.com') {
      return HttpResponse.json(
        { message: 'Too many requests' },
        { status: 429 }
      )
    }

    if (email === 'user@ok.com' && password === 'password123') {
      return HttpResponse.json(
        { need2fa: true, sessionId: 'session-123', expiresIn: 60 },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post('/api/auth/2fa', async ({ request }) => {
    const { sessionId, code } = (await request.json()) as {
      sessionId: string
      code: string
    }

    if (!sessionId) {
      return HttpResponse.json({ message: 'No session' }, { status: 400 })
    }

    if (code === '000000') {
      return HttpResponse.json(
        { message: 'Code expired', expired: true },
        { status: 410 }
      )
    }

    if (code === '123456') {
      return HttpResponse.json({ token: 'jwt-token' }, { status: 200 })
    }

    return HttpResponse.json({ message: 'Invalid code' }, { status: 400 })
  }),

  http.post('/api/auth/resend', async () => {
    return HttpResponse.json({ sent: true, expiresIn: 60 }, { status: 200 })
  }),

  // перехватываю первый запрос при загрузке, обрабатываю предупреждение от MSW
  http.get('/', () => HttpResponse.text('OK'))
]
