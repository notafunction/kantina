import { db } from '../../lib/firebase-admin'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (req: VercelRequest, res: VercelResponse) => {
  switch (req.method) {
    case 'GET': {
      return await handleGet(req, res)
    }
    case 'POST': {
      return handlePost(req, res)
    }
    case 'PUT': {
      return handlePut(req, res)
    }
    case 'DELETE': {
      return handleDelete(req, res)
    }
  }
}

async function handleGet(req, res) {
  const value = await db.ref(`/boards`).once('value').then((snap) => snap.val())

  return res.send(value)
}

function handlePost(req, res) {

}

function handlePut(req, res) {

}

function handleDelete(req, res) {

}