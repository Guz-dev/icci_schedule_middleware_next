import { promises as fs } from 'fs-extra'
import { get_data_table } from '@/services/database'

export default function handler(req, res) {
  const { table } = req.query
  if (table == "bloques_horario"){
    return res.redirect('/api/bloques')
  }
    
  fs.readFile(process.cwd()+`/src/data/${table}.json`, 'utf8')
    .then(data => {
      console.log("Leyo archivo")
      res.send(JSON.parse(data))
    })
    .catch(() => {
      console.log("Realiza fetch")
      get_data_table(table)
        .then(data => res.send({ data }))
        .catch((err) => console.log(err))
    })

}