import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Article from '@/Components/Article';
import Footer from '@/Components/Footer';
import { PropsWithChildren, useEffect } from 'react';

interface ILayout extends PropsWithChildren {
	title?: string
}

const Layout: React.FC<ILayout> = ({ children, title }) => {

	return (
		<>
			<Head title={title} />
			<Header />
			<main id="main">
				<Article children={children} />
			</main>
			<Footer />
		</>
	)
}

export default Layout;
