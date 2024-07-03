import { createContext, useState, useEffect } from "react";
import triggerData from '../triggers.json';
import useAudioContext from "../useAudioContext";

/* @ts-expect-error: TODO: Provide default */
export const SynthContext = createContext();

export const SynthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [octave, setOctave] = useState<"low" | "middle" | "high">("middle");
	const [keyboardLetters, setKeyboardLetters] = useState<boolean>(false);
	const [mute, setMute] = useState<boolean>(false);
	const [lowpass, setLowpass] = useState<boolean>(false);
	const [waveForm, setWaveForm] = useState<string>('sine');
	const [lowpassFrequency, setLowpassFrequency] = useState<number>(80);
	const [gain, setGain] = useState<number>(50);
	const [decay, setDecay] = useState<number>(5);
	const [activeKeys, setActiveKeys] = useState<(keyof typeof triggerData)[]>([]);
	const [synthActive, setSynthActive] = useState(false);

	const triggerKeys = Object.keys(triggerData) as (keyof typeof triggerData)[];
	const audioContext = useAudioContext({
		octave,
		mute,
		lowpass,
		waveForm,
		lowpassFrequency,
		gain,
		decay,
		activeKeys
	});

	const resumeContext = () => {
		setSynthActive(true);
		audioContext.resume();
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {

			if ( ! synthActive ) {
				resumeContext();
			}

			if ( ['z', 'x', 'c'].includes(e.key) ) {
				switch(e.key) {
					case 'z':
						setOctave('low');
						break;
					case 'c':
						setOctave('high');
						break;
					default:
						setOctave('middle');
				}
				return;
			}

			if (
				/* @ts-expect-error: we are checking if the pressed key is a trigger */
				! triggerKeys.includes(e.key)
				/* @ts-expect-error: we are checking if the pressed key is a trigger */
				|| activeKeys.includes(e.key)
			) {
				return;
			}

			/* @ts-expect-error: we are checking if the pressed key is a trigger */
			setActiveKeys(activeKeys => [...activeKeys, e.key]);
		}

		const handleKeyUp = (e: KeyboardEvent) => {
			if (
				/* @ts-expect-error: we are checking if the pressed key is a trigger */
				! triggerKeys.includes(e.key)
				/* @ts-expect-error: we are checking if the pressed key is a trigger */
				|| ! activeKeys.includes(e.key)
			) {
				return;
			}

			setActiveKeys(activeKeys.filter(key => key !== e.key));
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		}
	}, [activeKeys])

	return (
		<SynthContext.Provider
		value={{
			octave,
			setOctave,
			keyboardLetters,
			setKeyboardLetters,
			mute,
			setMute,
			lowpass,
			setLowpass,
			waveForm,
			setWaveForm,
			lowpassFrequency,
			setLowpassFrequency,
			gain,
			setGain,
			decay,
			setDecay,
			activeKeys
		}} >
			{children}
		</SynthContext.Provider>
	)
}
