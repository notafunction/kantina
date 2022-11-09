import { db } from '../../lib/firebase-admin'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (req: VercelRequest, res: VercelResponse) => {
  return res.send(req.query)
}