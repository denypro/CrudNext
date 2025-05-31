import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Dados recebidos:', req.body);
    const {name, email } = req.body;

    if (!name ) {
      return res.status(400).json({ message: 'name é obrigatório.' });
    }

    try {
      const novoUsuario = await prisma.user.create({
        data: { name, email},
      });

      console.log("Usuário criado com sucesso:", novoUsuario);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }

  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.user.findMany();
      console.log('Usuários cadastrados:', usuarios);
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  }



 

    if (req.method==='PUT') {

        const {id,name,email} = req.body;

        try {
            const AtualizarUsuario = await prisma.user.update({
                where:{id},
                data:{name,email}


            })

            return res.status(200).json(AtualizarUsuario)
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({mensagen:'erro a atualizar usuario'})
            
        }
        
    }


    if (req.method==='DELETE') {

        const {id} = req.body;

        try {
            const ApagarUsuario = await prisma.user.delete({
                where:{id}
            })

            return res.status(200).json(ApagarUsuario)
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({mensagem:'Erro ao apagar usuario'})

        }
        
    }


  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
  return res.status(405).end(`Método ${req.method} não permitido.`);
}
