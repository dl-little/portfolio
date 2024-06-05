import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { PropsWithChildren } from 'react';
import { useState, useLayoutEffect, useRef } from 'react';

interface ILayout extends PropsWithChildren {
	title?: string
}

const Layout: React.FC<ILayout> = ({ children, title }) => {
	const [ marginVar, setMarginVar ] = useState({});
	const ref = useRef(null);

	useLayoutEffect(() => {
		const height = ref.current.getBoundingClientRect().height;
		const viewHeight = window.document.body.clientHeight;
		const gap = .9 * parseFloat( getComputedStyle( window.document.body ).fontSize );
		const scrollOffset = Math.round( height - viewHeight );
		if ( scrollOffset <= 0 ) {
			return;
		}
		console.log('height:', height, 'viewHeight:', viewHeight, 'scrollOffset:', scrollOffset);
		setMarginVar({ "--scroll-offset": `${Math.round( scrollOffset / gap )}em` } as React.CSSProperties);
	},[ref])

	return (
		<>
			<Head title={title} />
			<Header />
			<main id="main">
				<article id="article" ref={ref} style={marginVar}>
					{children}
				</article>
			</main>
			<Footer />
		</>
	)
}

export default Layout;
