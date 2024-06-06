import { PropsWithChildren, useRef, useLayoutEffect } from 'react';

const Article: React.FC<PropsWithChildren> = ({children}) => {
	const ref = useRef<HTMLElement | null>(null);

	const getScrollOffset = () => {
		const articleScrollHeight = ref?.current?.scrollHeight;
		const articleOffsetHeight = ref?.current?.offsetHeight;

		if (
			( !articleScrollHeight || !articleOffsetHeight ) ||
			articleScrollHeight <= articleOffsetHeight
		) {
			return 0;
		}

		const gap = .9 * parseFloat( getComputedStyle( window.document.body ).fontSize );
		return Math.round((articleScrollHeight + ( gap * 2 )) - articleOffsetHeight );
	}

	const setBodyAttribute = () => {
		document.body.setAttribute('style', '');
		document.body.setAttribute('style', `--scroll-offset: ${getScrollOffset()}px`);
	}

	useLayoutEffect(() => {

		setBodyAttribute();
		window.addEventListener('resize', setBodyAttribute);

		return () => {
			document.body.setAttribute('style', '');
			window.removeEventListener('resize', setBodyAttribute);
		}
	}, [children])

	return (
		<article id="article" ref={ref} >
			{children}
		</article>
	)
}

export default Article;