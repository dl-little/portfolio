import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Main from '../Components/Main';
import Footer from '../Components/Footer';
import { PropsWithChildren } from 'react';

interface ILayout extends PropsWithChildren {
	title: string
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<Main>
				<Header title={title} />
				<article className="group">
					{children}
				</article>
				<Footer />
			</Main>
		</>
	)
}

export default Layout;
