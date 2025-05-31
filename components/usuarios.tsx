"use client"

import { useEffect, useState } from 'react'
import {criarUsuario,listarUsuarios,atualizarUsuario,deletarUsuario,} from '@/app/lib/actions/userActions'

interface usuario  {
  id: number
  name: string
  email: string
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<usuario[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Estados para edição
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = await listarUsuarios()
      setUsuarios(dados)
    }
    carregar()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)

    try {
      const novo = await criarUsuario(name, email)
      setUsuarios((prev) => [...prev, novo])
      setName('')
      setEmail('')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Deseja realmente deletar este usuário?')) {
      try {
        await deletarUsuario(id)
        setUsuarios((prev) => prev.filter((u) => u.id !== id))
      } catch (error) {
        console.error('Erro ao deletar:', error)
      }
    }
  }

  function startEdit(usuario: usuario) {
    setEditingId(usuario.id)
    setEditName(usuario.name)
    setEditEmail(usuario.email)
  }


  function cancelEdit() {
    setEditingId(null)
    setEditName('')
    setEditEmail('')
  }

  async function saveEdit(id: number) {
    try {
      const atualizado = await atualizarUsuario(id, {
        name: editName,
        email: editEmail,
      })
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? atualizado : u))
      )
      cancelEdit()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Criar Usuário
        </button>
      </form>

      <ul className="space-y-2">
        {usuarios.map((usuario) => (
          <li
            key={usuario.id}
            className="p-4 border rounded-md flex justify-between items-center"
          >
            {editingId === usuario.id ? (
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold">{usuario.name}</p>
                <p className="text-sm text-gray-500">{usuario.email}</p>
              </div>
            )
            }

            <div className="flex items-center space-x-2">
              {editingId === usuario.id ? (
                <>
                  <button
                    onClick={() => saveEdit(usuario.id)}
                    className="text-green-600 hover:underline"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-600 hover:underline"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(usuario)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="text-red-600 hover:underline"
                  >
                    Deletar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
