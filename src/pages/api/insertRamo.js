import { insertRamo } from '@/services/database.js'

export default function handler(req, res) {
  console.log("Realiza insert")
  const { data } = req.body

  insertRamo(data).then((isWorking) => {
    console.log(isWorking)
    if(isWorking){
      res.send("Funciono")
    } else {
      res.send("No funciono")
    }    
  })

}
  