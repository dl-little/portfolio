import StartStopIcon from "./StartStopIcon";
import styled from "styled-components";

const PButton = styled.button`
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

interface IPauseButton {
	onClick: () => void,
	paused: boolean
}

const PauseButton:React.FC<IPauseButton> = ({onClick, paused}) => {
	return (
		<PButton onClick={onClick} data-action={ !paused ? 'stop' : 'start'}>
			<p className="screen-reader-text">
				{`${!paused ? 'Stop' : 'Start'} animation`}
			</p>
			<StartStopIcon paused={paused} />
		</PButton>
	)
}

export default PauseButton;
