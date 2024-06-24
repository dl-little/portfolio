import useScrollOffset from '@/Hooks/useScrollOffset';
import { PropsWithChildren, useRef, useLayoutEffect, useCallback } from 'react';

const Article: React.FC<PropsWithChildren> = ({children}) => {
	const ref = useRef<HTMLElement | null>(null);
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