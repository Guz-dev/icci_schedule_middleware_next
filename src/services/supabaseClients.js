import { createClient } from '@supabase/supabase-js'

const CANT_DATABASE_A = 2 * 2
const CANT_DATABASE_B = 2 * 2

const supabase_a_clients = []
const supabase_b_clients = []


export function get_supabase_clients(database='AB'){
  const arr_env = ['SUPABASE_A', 'SUPABASE_ANON_KEY_A',
    'SUPABASE_A_RESPALDO', 'SUPABASE_ANON_KEY_A_RESPALDO',
    'SUPABASE_B', 'SUPABASE_ANON_KEY_B',
    'SUPABASE_B_RESPALDO', 'SUPABASE_ANON_KEY_B_RESPALDO']
  
  try{
    if(database.includes('A')){
      for (let i = 0; i < CANT_DATABASE_A; i += 2) {
        if(process.env[arr_env[i]] != undefined){
          const url = process.env[arr_env[i]]
          const key = process.env[arr_env[i+1]]
          try{
            supabase_a_clients.push(createClient(url, key))
          }
          catch{
            supabase_a_clients.push(undefined)
          }
        } 
      }
      if(database == 'A') return supabase_a_clients
    }
  }
  catch{
    console.log("Error en supabase_a_clients")
  }

  try{
    for (let i = CANT_DATABASE_A; i < CANT_DATABASE_A + CANT_DATABASE_B; i += 2) {
      if(process.env[arr_env[i]] != undefined){
        const url = process.env[arr_env[i]]
        const key = process.env[arr_env[i+1]]
        try{
          supabase_b_clients.push(createClient(url, key))
        }
        catch{
          supabase_b_clients.push(undefined)
        }
      } 
    }
    if(database == 'B') return supabase_b_clients
  }
  catch{
    console.log("Error en supabase_b_clients")
  }

  return {supabase_a_clients, supabase_b_clients}
}
