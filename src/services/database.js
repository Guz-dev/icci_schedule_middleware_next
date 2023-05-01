import { getHora } from './fecha_hora.js'
import { get_supabase_clients } from './supabaseClients.js'

//OBTIENE DATOS DE BLOQUES_HORARIO
export async function get_data() {
  const { supabase_a_clients, supabase_b_clients }  = get_supabase_clients('AB')
  const fetchedData = []
  const query = `semestre, 
    bloques_horario( profesor, sala, grupo, dia,
      ramos( ramo ),
      bloques_horas( inicio, termino )
    )
  `
  await pushFetched(fetchedData, supabase_a_clients,'semestres',query)
  await pushFetched(fetchedData, supabase_b_clients,'semestres',query)


  return fetchedData
}

//OBTIENE DATOS DE CUALQUIER TABLA ESPECIFICA
export async function get_data_table(table) {
  console.log("get_data_table")
  const { supabase_a_clients, supabase_b_clients }  = get_supabase_clients('AB')

  const fetchedData = []
  await pushFetched(fetchedData, supabase_a_clients, table)
  await pushFetched(fetchedData, supabase_b_clients, table)

  return fetchedData.flat(Infinity)

}

async function pushFetched(fetchedData, clients_list,table,query='*'){
  console.log("pushFetched")
  for (const supabase_client of clients_list) {
    if (!supabase_client) {
      console.warn("Skipping undefined Supabase client")
      continue
    }
    
    try {
      const { data } = await supabase_client.from(`${table}`)
        .select(query)
            
      if (data == null){
        console.log("Fallo cliente ")
        console.log(supabase_client)
        continue
      }      
            
      console.log("Cliente funciono ")
      //console.log(supabase_client)

      fetchedData.push( data )
            
      // Stop fetching data from the remaining Supabase clients
      break
    } catch (error) {
      console.error(error)
      continue // Try fetching data from the next Supabase client
    }
  }
}


export async function insertRamo(args) {
  if (args == undefined){
    console.log("Fallo cliente ")
    return false
  }
  console.log(args)    

  for (const key in args) {
    if (args[key] === null || args[key] === undefined) {
      console.log(`The '${key}' key's value is null or undefined`)
      return false
    }
  }

  console.log("Cliente funciono")
  if (args.semestre <= 2){
    const supabase_a_clients = get_supabase_clients('A')
    await insert(supabase_a_clients, 'ramos', args)
  }
  else{
    const supabase_b_clients = get_supabase_clients('B')
    await insert(supabase_b_clients, 'ramos', args)
  }
}

async function insert(clients_list,table,args){
  const date = getHora()
    
  args['id'] = getRandomIntInclusive(50, 10000)
  args['fecha'] = date
  console.log(args)

  for (const supabase_client of clients_list) {
    if (!supabase_client) {
      console.warn("Skipping undefined Supabase client")
      return false
    }
  }

  for (const supabase_client of clients_list) {
    try {
      

      const { error } = await supabase_client.from(`${table}`).insert(args)
  
      if (error){
        console.log("Fallo cliente")   
        console.log(error)
        //console.log(supabase_client)
      }

      //console.log(supabase_client)

    } catch (error) {
      console.error(error)
      break // Try fetching data from the next Supabase client
    }
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
