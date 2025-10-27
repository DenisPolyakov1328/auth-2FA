export const App = () => {
  const handleClick = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@ok.com', password: 'password123' })
    })
    console.log(await res.json())
  }

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-[440px] bg-white flex items-center justify-center">
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-[9px]">
            <img alt="icon" src="/symbol.svg" />
            <span className="text-2xl">Company</span>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleClick}
          >
            Отправить тестовый запрос
          </button>
        </div>
      </div>
    </div>
  )
}
