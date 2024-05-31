import { PageProps } from '@inertiajs/core';
import { route as routeFn } from 'ziggy-js';

export interface ISharedProps extends PageProps {
	auth: {
		user: {
			id: number,
			name: string,
			email: string
		}
	}
}

declare global {
	var route: typeof routeFn;
}
