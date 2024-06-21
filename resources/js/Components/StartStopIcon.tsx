import variables from '../../scss/abstracts/_shared.module.scss';
const { contrast } = variables;

import RenderIf from "./RenderIf"

interface IStartStopIcon {
	paused: boolean
}

const StartStopIcon: React.FC<IStartStopIcon> = ({ paused }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="start-stop-icon"
			version="1.1"
			height="20"
			width="20"
			viewBox="0 0 1200 1200"
		>
			<RenderIf isTrue={!paused}>
				<path
					fill={contrast}
					d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z"
				/>
			</RenderIf>
			<RenderIf isTrue={paused}>
				<path
					fill={contrast}
					d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z"
				/>
			</RenderIf>
		</svg>
	)
}

export default StartStopIcon;
