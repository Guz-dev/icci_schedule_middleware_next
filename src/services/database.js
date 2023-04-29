import { getHora } from './fecha_hora.js'
import { get_supabase_clients } from './supabaseClients.js'

//OBTIENE DATOS DE BLOQUES_HORARIO
export async function get_data() {
  const { supabase_a_clients, supabase_b_clients }  = get_supabase_clients('AB')
  const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
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
  const { supabase_a_clients, supabase_b_clients }  = get_supabase_clients('AB')

  const fetchedData = []
  await pushFetched(fetchedData, supabase_a_clients, table)
  await pushFetched(fetchedData, supabase_b_clients, table)

  return fetchedData.flat(Infinity)

}

async function pushFetched(fetchedData, clients_list,table,query='*'){
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
        //console.log(supabase_client)
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
    const { supabase_a_clients } = get_supabase_clients('A')
    insert(supabase_a_clients, 'ramos', args)
  }
  else{
    const { supabase_b_clients } = get_supabase_clients('B')
    insert(supabase_b_clients, 'ramos', args)
  }
}

async function insert(clients_list,table,args){
  const date = getHora()
    
  args['fecha'] = date
  console.log(args)

  for (const supabase_client of clients_list) {
    if (!supabase_client) {
      console.warn("Skipping undefined Supabase client")
      return false
    }
  }

  for (const supabase_client of clients_list) {
    if (!supabase_client) {
      console.warn("Skipping undefined Supabase client")
      continue
    }
    
    try {
      const { error } = await supabase_client.from(`${table}`).insert(args)
  
  
      if (data == null){
        console.log("Fallo cliente ")   
        //console.log(supabase_client)
        continue
      }      
      console.log("Cliente funciono ")
      //console.log(supabase_client)

    } catch (error) {
      console.error(error)
      continue // Try fetching data from the next Supabase client
    }
  }
}