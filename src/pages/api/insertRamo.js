import { insertRamo } from '@/services/database.js'
import NextCors from 'nextjs-cors'

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: `${process.env.PAGE_ADDRESS}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  console.log("Realiza insert")
  const { data } = req.body

  await insertRamo(data).then((isWorking) => {
    console.log(isWorking)
    if(isWorking){
      res.send("Funciono")
    } else {
      res.send("No funciono")
    }    
  })

}
  