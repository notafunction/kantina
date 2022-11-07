export default function handler(req, res) {
  console.log(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
