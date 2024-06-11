import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import variables from '../../scss/abstracts/_shared.module.scss'
const { gap } = variables;
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
	flex-flow: row wrap;
	gap: .2em;
	align-items: flex-start;
	overflow: hidden;
	padding: .2em;
`;

const Rotating = styled.span`
	display: flex;
	flex-flow: column nowrap;
	align-self: flex-start;
	text-align: left;
`;

const RotatingTitle = styled.span`
	margin-top: -.1em;
	display: none;

	&.active {
		display: block;
	}
`;

const nouns = [
	'full-stack developer',
	'former teacher',
	'React developer',
	'WordPress developer',
];

const Home = () => {
	const [ activeIndex, setActiveIndex ] = useState(0);

	const changeTitle = () => {
		let randomIndex = Math.floor( Math.random() * nouns.length );

		do {
			randomIndex = Math.floor( Math.random() * nouns.length );
		} while ( randomIndex === activeIndex )

		setActiveIndex( randomIndex );
	}

	useEffect(() => {
		const interval = setInterval(changeTitle, 3000);
		return () => {
			clearInterval(interval);
		};
	}, [activeIndex])

	return (
		<HomeContainer id="home-container">
			<small>Hey, I'm Doug!</small>
			<big>I build <span className="emphasis highlight accent">things</span> on the web.</big>
			<Marquee>
				I'm a
				<Rotating className="emphasis box primary">
						{nouns.map((noun, index) => {
							return (
								<RotatingTitle className={classNames("rotating-noun", {active: index === activeIndex})} key={noun}>
									{noun}
								</RotatingTitle>
							)
						})}
				</Rotating>
				.
			</Marquee>
		</HomeContainer>
	);
}

export default Home;
