import { Head } from '@inertiajs/react';
import useScrollOffset from '@/Hooks/useScrollOffset';
import { PropsWithChildren, useLayoutEffect, useContext, useState, ReactElement } from 'react';
import { ArticleContext } from '@/Layouts/ArticleContextProvider';

interface IArticle extends PropsWithChildren {
	title?: string
}

const Article: React.FC<IArticle> = ({children, title}) => {
	const [ assembledTitle, setAssembledTitle ] = useState<string | undefined>();
	const articleContext = useContext(ArticleContext);
	const ref = articleContext.articleRef;
	const { setBodyAttribute } = useScrollOffset(ref);

	const setTitle = () => {
		if ( ! children ) {
			return;
		}

		const { props } = children as ReactElement;
		if ( !! props.project ) {
			setAssembledTitle(`${title} / ${props.project.title}`);
		} else {
			setAssembledTitle(title);
		}
	}

	useLayoutEffect(() => {
		setTitle();
		setBodyAttribute();
	}, [children])

	return (
		<article id="article" ref={ref} >
			<Head title={assembledTitle}/>
			{children}
		</article>
	)
}

export default Article;