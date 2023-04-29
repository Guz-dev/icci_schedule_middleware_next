import { promises as fs } from 'fs-extra'
import { get_data } from '@/services/database.js'

export default function handler(req, res) {
  console.log("Realiza read")
  fs.readFile(process.cwd()+'/src/data/data.json', 'utf8')
    .then(data => {
      console.log("Leyo archivo")
      res.status(200).send(JSON.parse(data))
    })
    .catch(() => {
      console.log("Realiza fetch")
      get_data()
        .then(data => res.send({ data }))
        .catch((err) => console.log(err))
    })
}
  