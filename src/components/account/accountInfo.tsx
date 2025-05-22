interface Props {
  user: {
    name: string
    email: string
    phone: string
    role: string
  }
}

export default function AccountInfo({ user }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Información Personal</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-medium">Nombre completo</p>
          <p className="text-gray-800">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Correo electrónico</p>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Teléfono</p>
          <p className="text-gray-800">{user.phone}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Rol</p>
          <p className="text-gray-800">{user.role}</p>
        </div>
      </div>
    </div>
  )
}
