export default function AccountSettings() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Configuraciones</h3>

      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <p className="text-gray-700">Notificaciones por correo</p>
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="hidden" />
          <div className="w-10 h-5 bg-gray-300 rounded-full relative">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition" />
          </div>
        </label>
      </div>

      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <p className="text-gray-700">Autenticación en dos pasos</p>
        <button className="bg-blue-700 text-white px-4 py-2 rounded">Activar</button>
      </div>

      <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar cuenta</button>
    </div>
  )
}
