import { PropsWithChildren } from 'react';

const Main: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<main>
			{children}
		</main>
	)
}

export default Main;