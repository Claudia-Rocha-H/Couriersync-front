interface TopbarProps {
  userName: string
}

export default function Topbar({ userName }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white p-4 pl-64 z-40">
      <div className="max-w-full flex justify-end items-center">
        <div className="flex items-center gap-4">
          <span>{userName}</span>
          <img src="/img/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </header>
  )
}
