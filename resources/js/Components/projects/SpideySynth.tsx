import {
	SynthWrap,
	SynthControls,
	SynthKeyboard
} from "./Synth";
import { SynthContextProvider } from "./Synth/components/SynthContextProvider";

const SpideySynth:React.FC = () => {
	return (
		<SynthWrap>
			<SynthContextProvider>
				<SynthControls />
				<SynthKeyboard />
			</SynthContextProvider>
		</SynthWrap>
	)
}

export default SpideySynth;