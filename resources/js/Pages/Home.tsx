import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import classNames from 'classnames';

const HomeContainer = styled.section`
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;

	& > *:not(:first-child):not(big) {
		margin-block-start: .9rem;
	}

	& > * {
		display: block;
	}
`

const Marquee = styled.section`
	display: flex;
	flex-flow: row nowrap;
	gap: .2em;
	align-items: flex-start;
	white-space: nowrap;
	padding: .2em;
`;

const Rotating = styled.span`
	display: flex;
	flex-flow: column nowrap;
	align-self: flex-start;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	transition-property: width;
	transition-duration: 2s;
`;

const RotatingTitle = styled.span`
	margin-top: -.1em;
	display: none;

	&.active {
		display: block;
		max-width: fit-content;
	}
`;

// TODO: Make a setting for nouns
const nouns = [
	'full-stack developer',
	'coder',
	'former teacher',
	'proactive communicator',
	'React developer',
	'PHP developer',
	'documentation fiend',
	'gap-bridger',
	'chill hang',
	'container-of-multitudes',
	'credit-sharer',
	'software engineer',
	'WordPress developer',
	'UI Developer',
	'writer',
];

const Home = () => {
	const rotating = useRef<HTMLElement | null>(null);
	const [ activeIndex, setActiveIndex ] = useState(0);

	const changeTitle = () => {
		let randomIndex = Math.floor( Math.random() * nouns.length );

		do {
			randomIndex = Math.floor( Math.random() * nouns.length );
		} while ( randomIndex === activeIndex )

		setActiveIndex( randomIndex );
	}

	const setWidthOfParent = () => {
		if ( !!rotating && !!rotating.current ) {
			// Using JS to set the width allows for css transition. Need to get the scrollwidth, as 'width: auto' cannot be transitioned.
			rotating.current.style.width = `${rotating.current.querySelector('.active')?.scrollWidth}px`;
		}
	}

	useEffect(() => {
		const interval = setInterval(changeTitle, 3000);
		return () => {
			clearInterval(interval);
		};
	}, [])

	useEffect(() => {
		setWidthOfParent();
	}, [activeIndex])

	return (
		<HomeContainer id="home-container">
			<p>Hey, I'm Doug.</p>
			<big>I build things on the web.</big>
			<Marquee>
				I'm a
				<Rotating className="emphasis box primary" ref={rotating}>
						{nouns.map((noun, index) => {
							return (
								<RotatingTitle className={classNames("rotating-noun", {active: index === activeIndex})} key={noun}>
									{`${noun}.`}
								</RotatingTitle>
							)
						})}
				</Rotating>
			</Marquee>
		</HomeContainer>
	);
}

export default Home;
