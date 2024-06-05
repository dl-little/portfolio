import { PageProps } from '@inertiajs/core';
import { route as routeFn } from 'ziggy-js';

export interface ISharedProps extends PageProps {
	auth?: {
		user: {
			id: number,
			name: string,
			email: string
		}
	},
	canResetPassword?: boolean,
	status?: string,
}

declare global {
	var route: typeof routeFn;
}
