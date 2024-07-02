import { createContext, useState } from "react";

/* @ts-expect-error: TODO: Provide default */
export const SynthContext = createContext();

export const SynthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [octave, setOctave] = useState<"low" | "middle" | "high">("middle");
	const [keyboardLetters, setKeyboardLetters] = useState<boolean>(false);
	const [mute, setMute] = useState<boolean>(false);
	const [lowpass, setLowpass] = useState<boolean>(false);
	const [waveForm, setWaveForm] = useState<string>('sine');
	const [lowpassFrequency, setLowpassFrequency] = useState<number>(80);
	const [lowpassGain, setLowpassGain] = useState<number>(0);
	const [gain, setGain] = useState<number>(50);
	const [decay, setDecay] = useState<number>(5);

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
			lowpassGain,
			setLowpassGain,
			gain,
			setGain,
			decay,
			setDecay
		}} >
			{children}
		</SynthContext.Provider>
	)
}
