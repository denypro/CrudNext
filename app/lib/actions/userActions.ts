

export async function criarUsuario(name: string, email: string) {
  const res = await fetch(`/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  })

  if (!res.ok) {
    throw new Error(`Erro ao criar usuário: ${res.statusText}`)
  }

  return res.json()
}
// idem para as outras:
export async function listarUsuarios() {
  const res = await fetch(`/api/user`)
  return res.json()
}

export async function atualizarUsuario(id: number, dados: { name?: string; email?: string }) {
  const res = await fetch(`/api/user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...dados }),
  })
  if (!res.ok) throw new Error('Erro ao atualizar usuário.')
  return res.json()
}

export async function deletarUsuario(id: number) {
  const res = await fetch(`/api/user`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) throw new Error('Erro ao deletar usuário.')
  return res.json()
}
