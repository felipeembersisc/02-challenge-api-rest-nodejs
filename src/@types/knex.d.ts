declare module 'knex/types/tables' {
   export interface Tables {
      users: {
         usr_id: string
         usr_name: string
         usr_document: string
         usr_session_id?: string
         usr_email: string
         usr_phone: string
         usr_created_at: string
      }
      meals: {
         mea_id: string
         mea_user_id: string
         mea_name: string
         mea_description?: string
         mea_in_diet: boolean
         mea_date: string
         mea_time: string
         mea_created_at: string
         mea_updated_at?: string
      }
   }
}
