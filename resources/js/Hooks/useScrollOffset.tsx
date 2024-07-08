import { useLayoutEffect, useCallback, MutableRefObject } from "react";

const useScrollOffset = (ref: MutableRefObject<HTMLElement | null>) => {

	const getScrollOffset = useCallback(() => {
		if (
			! ref
			|| ! ref.current
			|| ! ref.current.offsetParent
			|| ! ref.current.firstElementChild
		) {
			return;
		}

		/*
		 * Calculations for scrollHeight differ dramatically between safari and chrome when display is set to flex.
		 * Set display to block so that we get a standardized result. Then set it back to flex.
		 */
		ref.current.style.display = 'block';
		const articleScrollHeight = ref.current.scrollHeight;
		const articleOffsetHeight = ref.current.offsetHeight;
		ref.current.style.display = 'flex';
		const gap = .9 * parseFloat( getComputedStyle( window.document.body ).fontSize );

		if (
			articleScrollHeight <= articleOffsetHeight
			// Below accounts for when the article is not taller than the viewport, but the frame overlaps the content.
			&& ref.current.offsetParent.clientHeight - ref.current.firstElementChild.clientHeight > (gap * 4)
		) {
			return 0;
		}

		return Math.round(((articleScrollHeight + ( gap * 3 )) - articleOffsetHeight ) / 2 );
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