import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import styled from "styled-components";
import classNames from 'classnames';
import StartStopIcon from "@/Components/StartStopIcon";
import { ISharedProps } from "@/Components/interfaces";

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
`;

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
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none;  /* Internet Explorer 10+ */
	height: 1em;
	scroll-behavior: smooth;
	scroll-snap-type: y mandatory;
	scroll-snap-points-y: repeat(1em);
	&.paused {
		overflow-y: scroll;
	}
`;

const RotatingTitle = styled.span`
	display: none;
	transition-property: display;
	.paused & {
		scroll-snap-align: start;
		display: block;
	}

	&.active {
		display: block;
		max-width: fit-content;
	}
`;

const PauseButton = styled.button`
	cursor: pointer;
	line-height: 1em;
	font-family: inherit; /* For all browsers */
	font-size: 100%; /* For all browsers */
	margin: 0; /* Firefox and Safari have margin */
	overflow: visible; /* Edge hides overflow */
	text-transform: none; /* Firefox inherits text-transform */
	-webkit-appearance: button; /* Safari otherwise prevents some styles */
	border: 0;
	background: 0;

	&::-moz-focus-inner {
		border-style: none;
		padding: 0;
	}

	&:-moz-focusring {
		outline: 1px dotted ButtonText;
	}
`;

interface IHomeContent extends ISharedProps {
	home_content: {
		home_big: string
		home_little: string
		home_nouns: string
	}
}

const splitNounArray = ( nouns: string ) => {
	return nouns.split(',');
}

const Home:React.FC<IHomeContent> = ({ home_content }) => {
	const rotating = useRef<HTMLElement | null>(null);
	const [ activeIndex, setActiveIndex ] = useState(0);
	const [ intervalId, setIntervalId ] = useState(0);
	const { home_nouns, home_big, home_little } = home_content;
	const nouns = useMemo(() => splitNounArray( home_nouns ), []);

	const handleClick = () => {
		if ( intervalId > 0 ) {
			clearInterval(intervalId);
			setIntervalId(0);
		} else {
			{/* @ts-expect-error: TODO: resolve. It is insisting on the type being NodeJS.Timeout */}
			const interval: number = setInterval(changeTitle, 2500) as number;
			setIntervalId(interval);
		}
	}

	const changeTitle = () => {
		let randomIndex = Math.floor( Math.random() * nouns.length );

		do {
			randomIndex = Math.floor( Math.random() * nouns.length );
		} while ( randomIndex === activeIndex )

		setActiveIndex( randomIndex );
	}

	useEffect(() => {
		{/* @ts-expect-error: TODO: resolve. It is insisting on the type being NodeJS.Timeout */}
		const interval: number = setInterval(changeTitle, 2500) as number;
		setIntervalId(interval);
	
		return () => {
			clearInterval(intervalId);
		};
	}, [])

	const setWidthOfParent = () => {
		if ( !rotating || !rotating.current ) {
			return;
		}

		// Using JS to set the width allows for css transition. Need to get the scrollwidth, as 'width: auto' cannot be transitioned.
		rotating.current.style.width = `${rotating.current.querySelector('.active')?.scrollWidth}px`;
	}

	// The blocking of browser paint in layout effects prevents some CLS on a hard refresh from width being applied to the rotating title.
	// To make the css transition work, the width can't be set explicitly.
	useLayoutEffect(() => {
		setWidthOfParent();
	}, [activeIndex])

	return (
		<HomeContainer id="home-container">
			<p className="emphasis highlight accent">{home_little}</p>
			<big>{home_big}</big>
			<Marquee>
				I'm a
				<Rotating className={classNames("emphasis box primary", {paused: intervalId === 0})} ref={rotating}>
					{nouns.map((noun, index) => {
						return (
							<RotatingTitle className={classNames("rotating-noun", {active: index === activeIndex})} key={noun}>
								{`${noun}.`}
							</RotatingTitle>
						)
					})}
				</Rotating>
				<PauseButton onClick={handleClick} data-action={ intervalId > 0 ? 'stop' : 'start'}>
					<p className="screen-reader-text">
						{`${intervalId > 0 ? 'Stop' : 'Start'} animation`}
					</p>
					<StartStopIcon paused={intervalId === 0} />
				</PauseButton>
			</Marquee>
		</HomeContainer>
	);
}

export default Home;
