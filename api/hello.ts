export default function handler(req, res) {
  console.log(req, res)
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
