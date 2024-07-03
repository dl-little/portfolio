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

	const [biFilter, setBiFilter] = useState<BiquadFilterNode | null>(null);
	const [openedOscs, setOpenedOscs] = useState<IOsc[]>([]);

	const changeGain = () => {
		openedOscs.forEach(o => {
			o.gainNode.gain.setValueAtTime(mute ? 0 : (gain/2)/100, audioContext.currentTime);
			if (mute) {
				return;
			}
			o.gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + decay);
		})
	}

	useEffect(() => {
		changeGain();
	}, [gain, mute])

	const createBiFilter = () => {
		const filter = audioContext.createBiquadFilter();
		filter.type = "lowpass";
		setBiFilter(filter);
	}

	const changeFilter = () => {
		biFilter?.frequency.setValueAtTime(! lowpass ? 350 : lowpassFrequency, audioContext.currentTime);
	}

	useEffect(() => {
		changeFilter();
	}, [lowpass, lowpassFrequency])

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
		gainNode.gain.setValueAtTime(mute ? 0 : (gain/2)/100, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + decay);

		setOpenedOscs(openedOscs => [...openedOscs, {
			trigger: key,
			oscNode: osc,
			gainNode: gainNode
		}]);
	}

	const makeConnections = () => {
		if ( ! biFilter ) {
			return;
		}
		
		openedOscs.forEach(o => {
			o.oscNode.connect(o.gainNode);
		 	o.gainNode.connect(biFilter);
		})

		biFilter?.connect(audioContext.destination);
	}

	const closeOsc = (osc: IOsc) => {
		osc.oscNode.stop(audioContext.currentTime);
		osc.oscNode.disconnect();
		osc.gainNode.disconnect();
		setOpenedOscs(openedOscs.filter(o => o.trigger !== osc.trigger));
	}

	useEffect(() => {
		createBiFilter();
	}, [])

	useEffect(() => {
		makeConnections();
	}, [biFilter, openedOscs])

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

	return audioContext;
}

export default useAudioContext;
