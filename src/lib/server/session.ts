//import type { Session } from '../../../supabase/index';
import { jwtDecode } from 'jwt-decode';

type SupabaseToken = {
	session_id: string;
};

export const getSessionId = (s: Session) => {
	//const token = jwtDecode<SupabaseToken>(s.access_token);
	//return token?.session_id ?? null;
	const token = jwtDecode<SupabaseToken>(s.access_token);
	//console.log(token, 'token');
	return token?.session_id ?? null;
};
