import useScrollOffset from '@/Hooks/useScrollOffset';
import { PropsWithChildren, useLayoutEffect, useContext } from 'react';
import { ArticleContext } from '@/Layouts/ArticleContextProvider';

const Article: React.FC<PropsWithChildren> = ({children}) => {
	const articleContext = useContext(ArticleContext);
	const ref = articleContext.articleRef;
	const { setBodyAttribute } = useScrollOffset(ref);

	useLayoutEffect(() => {
		setBodyAttribute();
	}, [children])

	return (
		<article id="article" ref={ref} >
			{children}
		</article>
	)
}

export default Article;