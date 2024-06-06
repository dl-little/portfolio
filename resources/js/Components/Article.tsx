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

		const bodyHeight = window.document.body.clientHeight;
		return articleScrollHeight - bodyHeight;
	}

	useLayoutEffect(() => {

		document.body.setAttribute('style', `--scroll-offset: ${getScrollOffset()}px`);

		return () => {
			document.body.setAttribute('style', '');
		}
	}, [children])

	return (
		<article id="article" ref={ref} >
			{children}
		</article>
	)
}

export default Article;