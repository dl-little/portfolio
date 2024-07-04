import { useEffect, useMemo, useState } from 'react';
import triggerData from './triggers.json';

interface IAudioContextProps {
	octave: "low" | "middle" | "high"
	mute: boolean
	lowpass: boolean
	waveForm: string
	lowpassFrequency: number
	gain: number
	decay: number
	activeKeys: (keyof typeof triggerData)[]
}

type IOsc = {
	trigger: keyof typeof triggerData;
	oscNode: OscillatorNode;
	gainNode: GainNode;
};

const useAudioContext = (props: IAudioContextProps) => {
	const {
		octave,
		mute,
		lowpass,
		waveForm,
		lowpassFrequency,
		gain,
		decay,
		activeKeys
	} = props;

	const audioContext = useMemo(() => {
		return new window.AudioContext();
	}, []);

	const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
	const [masterGain, setMasterGain] = useState<GainNode | null>(null);
	const [biFilter, setBiFilter] = useState<BiquadFilterNode | null>(null);
	const [openedOscs, setOpenedOscs] = useState<IOsc[]>([]);

	const changeGain = () => {
		masterGain?.gain.setValueAtTime(mute ? 0 : (gain/2)/100, audioContext.currentTime);
	}

	const createMasterGain = () => {
		const node = audioContext.createGain();
		node.gain.setValueAtTime((gain/2)/100, audioContext.currentTime);
		setMasterGain(node);
	}

	const createBiFilter = () => {
		const filter = audioContext.createBiquadFilter();
		filter.type = "lowpass";
		setBiFilter(filter);
	}

	const createAnalyser = () => {
		const node = audioContext.createAnalyser();
		setAnalyser(node);
	}

	const changeFilter = () => {
		biFilter?.frequency.setValueAtTime(! lowpass ? 350 : lowpassFrequency, audioContext.currentTime);
	}

	const openOsc = (
		key: keyof typeof triggerData,
		frequency: number,
		waveForm: OscillatorType
	) => {
		const osc = audioContext.createOscillator();
		osc.type = waveForm;
		osc.frequency.value = frequency;
		osc.start();

		const gainNode = audioContext.createGain();

		if ( decay < 10 ) {
			gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + decay);
		}

		setOpenedOscs(openedOscs => [...openedOscs, {
			trigger: key,
			oscNode: osc,
			gainNode: gainNode
		}]);
	}

	const connectGainNodes = () => {
		openedOscs.forEach(o => {
			o.oscNode.connect(o.gainNode);
		 	o.gainNode.connect(masterGain || audioContext.destination);
		})
	}

	const makeConnections = () => {
		masterGain?.connect(biFilter || audioContext.destination);
		biFilter?.connect(analyser || audioContext.destination);
		analyser?.connect(audioContext.destination);
	}

	const closeOsc = (osc: IOsc) => {
		osc.oscNode.stop(audioContext.currentTime);
		osc.oscNode.disconnect();
		osc.gainNode.disconnect();
		setOpenedOscs(openedOscs.filter(o => o.trigger !== osc.trigger));
	}

	useEffect(() => {
		changeFilter();
	}, [lowpass, lowpassFrequency])

	useEffect(() => {
		changeGain();
	}, [gain, mute])

	useEffect(() => {
		createBiFilter();
		createMasterGain();
		createAnalyser();
	}, [])

	useEffect(() => {
		connectGainNodes();
	}, [openedOscs])

	useEffect(() => {
		makeConnections();
	}, [analyser])

	useEffect(() => {
		// If osc array contains a key that is not an active key, close osc.
		openedOscs.forEach(o => {
			if ( ! activeKeys.includes(o.trigger) ) {
				closeOsc(o);
			}
		})

		// If osc array does not already contain new active key, open osc.
		activeKeys.forEach((k) => {
			let existingOsc = false;

			openedOscs.forEach(o => {
				if ( o.trigger === k ) {
					existingOsc = true;
				}
			})

			if ( ! existingOsc ) {
				openOsc(
					k as keyof typeof triggerData,
					Number(triggerData[k][octave]),
					waveForm as OscillatorType
				)
			}
		})
	}, [activeKeys, octave, waveForm])

	return {audioContext, analyser};
}

export default useAudioContext;
