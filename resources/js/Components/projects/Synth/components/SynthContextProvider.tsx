import { createContext, useState, useEffect, RefObject } from "react";
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
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

	const triggerKeys = Object.keys(triggerData) as (keyof typeof triggerData)[];
	const {audioContext, analyser} = useAudioContext({
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
		if ( ! canvas ) {
			return;
		}
	
		const canvasContext = canvas.getContext('2d');

		if ( ! canvasContext || ! analyser ) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		const draw = () => {
			analyser.getByteTimeDomainData(dataArray);
			canvasContext.fillStyle = 'rgb(200, 200, 200)';
			canvasContext.fillRect(0, 0, canvas.width, canvas.height);

			canvasContext.lineWidth = 2;
			canvasContext.strokeStyle = 'rgb(0, 0, 0)';
			canvasContext.beginPath();

			const sliceWidth = canvas.width * 1.0 / bufferLength;
			let x = 0;

			for( let i = 0; i < bufferLength; i++ ) {

				let v = dataArray[i] / 128.0;
				let y = v * canvas.height/2;

				if(i === 0) {
					canvasContext.moveTo(x, y);
				} else {
					canvasContext.lineTo(x, y);
				}

				x += sliceWidth;
			}

			canvasContext.lineTo(canvas.width, canvas.height/2);
			canvasContext.stroke();

			// debounce the animation frames.
			setTimeout(() => {
				requestAnimationFrame(draw);
			}, 300)
		}

		draw();

	}, [activeKeys, canvas])

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
			activeKeys,
			setCanvas
		}} >
			{children}
		</SynthContext.Provider>
	)
}
