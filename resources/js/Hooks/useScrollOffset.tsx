import { useLayoutEffect, useCallback, MutableRefObject } from "react";

const useScrollOffset = (ref: MutableRefObject<HTMLElement | null>) => {

	const getScrollOffset = useCallback(() => {
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
	}, [ref])

	const setBodyAttribute = useCallback(() => {
		document.body.setAttribute('style', '');
		document.body.setAttribute('style', `--scroll-offset: ${getScrollOffset()}px`);
	}, [getScrollOffset])

	useLayoutEffect(() => {

		window.addEventListener('resize', setBodyAttribute);

		return () => {
			document.body.setAttribute('style', '');
			window.removeEventListener('resize', setBodyAttribute);
		}
	}, [])

	return { setBodyAttribute };
}

export default useScrollOffset;