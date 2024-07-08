import Header from '@/Components/Header';
import Article from '@/Components/Article';
import Footer from '@/Components/Footer';
import { PropsWithChildren } from 'react';
import ArticleContextProvider from './ArticleContextProvider';

export interface ILayout extends PropsWithChildren {
	title?: string
	user?: {
		id: number,
		name: string,
		email: string
	}
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
	
	return (
		<>
			<Header />
			<main id="main">
				<ArticleContextProvider>
					<Article children={children} title={title} />
				</ArticleContextProvider>
			</main>
			<Footer />
		</>
	)
}

export default Layout;
