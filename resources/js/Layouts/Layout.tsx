import { Head } from '@inertiajs/react';
import Header from '../Components/Header';

const Layout = ({ children, title }) => {

	return (
		<>
			<Head title={title} />
			<main>
				<Header title={title} />
				<article>
					{children}
				</article>
			</main>
		</>
	)
}

export default Layout;
