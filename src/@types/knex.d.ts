declare module 'knex/types/tables' {
	export interface Tables {
		users: {
			usr_id: string;
			usr_name: string;
			usr_document: string;
			usr_session_id?: string;
			usr_created_at: string;
		};
	}
}
