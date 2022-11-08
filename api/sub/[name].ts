import { db } from '../../lib/firebase'

export default function handler(req, res) {
  console.log(db)
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
