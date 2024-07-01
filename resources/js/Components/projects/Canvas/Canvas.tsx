import { useRef, useEffect, useState, useMemo } from 'react';
import PauseButton from '@/Components/PauseButton';
import styled from 'styled-components';
import variables from '../../../../scss/abstracts/_shared.module.scss';
import {
	getCells,
	getClouds,
	drawClusters,
	drawSky,
	shiftClusters,
	loadBirds,
	clamp
} from './helpers';
const { tabletBreak, contrast } = variables;

const CanvasWrapper = styled.div<{width: number, height: number}>`
	position: relative;
	border: 1px solid ${contrast};
	max-width: 100%;
	width: ${props => props.width}px;
	height: ${props => props.height}px;

	@media (min-width: ${tabletBreak}) {
		width: calc(${props => props.width}px * 2);
		height: calc(${props => props.height}px * 2);
	}
`;

const BaseCanvas = styled.canvas`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0; 
	top: 0;
	image-rendering: pixelated;
	object-fit: cover;
`;

const CloudCanvas = styled(BaseCanvas)`
`;

interface ICanvas {
	width: number
	height: number
	columns: number
}

export interface ICell {
	index: number,
	rect: {
        x: number
        y: number
        cellWidth: number
        cellHeight: number
    }
    neighbors: {
        next: number
        prev: number
        top: number
        topLeft: number
        topRight: number
        bottom: number
        bottomLeft: number
        bottomRight: number
    }
    position: {
        top: boolean
		rightEdge: boolean
		bottom: boolean
		leftEdge: boolean
    }
    seedCloud: boolean
}

const Canvas: React.FC<ICanvas> = (props) => {
	const { columns, width, height } = props;
	const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const cloudCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const cells = useMemo(() => getCells(width, columns), []);
	const [birds, setBirds] = useState<{plainBirds: HTMLImageElement, blueBirds:HTMLImageElement} | null>(null);
	const { cLusters } = useMemo(() => getClouds(cells), []);
	const [ clusters, setClusters ] = useState(cLusters);
	const [ intervalId, setIntervalId ] = useState(0);

	const handleClick = () => {
		if ( intervalId > 0 ) {
			clearInterval(intervalId);
			setIntervalId(0);
		} else {
			{/* @ts-expect-error: TODO: resolve. It is insisting on the type being NodeJS.Timeout */}
			const interval: number = setInterval(anticipate, 200) as number;
			setIntervalId(interval);
		}
	}

	const anticipate = () => {
		setClusters(shiftClusters(clusters, width, height));
	}

	const drawScene = (cloudContext: CanvasRenderingContext2D) => {
		if ( ! clusters ) {
			return;
		}

		cloudContext.clearRect(0, 0, width, height);
		drawClusters(cloudContext, clusters);
	}

	useEffect(() => {
		if ( ! cloudCanvasRef.current ) {
			return;
		}

		const cloudCanvas = cloudCanvasRef.current;
		const cloudContext = cloudCanvas.getContext('2d');

		if ( ! cloudContext ) {
			return;
		}

		drawScene(cloudContext);
	}, [clusters])

	useEffect(() => {
		if ( ! baseCanvasRef.current ) {
			return;
		}

		const baseCanvas = baseCanvasRef.current;
		const baseContext = baseCanvas.getContext('2d');

		if ( ! baseContext ) {
			return;
		}

		baseContext.save();

		{/* @ts-expect-error: TODO: resolve. It is insisting on the type being NodeJS.Timeout */}
		const interval: number = setInterval(anticipate, 200) as number;
		setIntervalId(interval);

		// Set sky on base canvas
		drawSky(baseContext, width);

		return () => {
			clearInterval(intervalId);
		}
	}, [])

	useEffect(() => {
		loadBirds().then((birdsObj) => {
			setBirds(birdsObj);
		})
	}, [])
	
	useEffect(() => {
		if (
			! baseCanvasRef.current ||
			! birds ||
			intervalId === 0
		) {
			return;
		}

		const baseCanvas = baseCanvasRef.current;
		const baseContext = baseCanvas.getContext('2d');

		if ( ! baseContext ) {
			return;
		}
		
		let cols = 4;
		let frameWidth = 128;
		let frameHeight = 76;
		let spriteWidth = 64;
		let spriteHeight = 38;
		let maxFrame = 3;
		let anchorX = width / 2 - spriteWidth;
		let anchorY = height / 2 - spriteHeight;
		const numBirds = 7;
		const frames: {
			column: number
			descend: boolean
		}[] = [];
		const intervals: number[] = [];

		for( let i = 0; i < numBirds; i++ ) {
			frames.push({
				column: i % cols,
				descend: false
			})

			{/* @ts-expect-error: TODO: resolve. It is insisting on the type being NodeJS.Timeout */}
			intervals.push(setInterval(function() {
				if ( frames[i].column >= maxFrame ) {
					frames[i].descend = true;
				} else if ( !! frames[i].descend && frames[i].column === 0 ) {
					frames[i].descend = false;
				}

				if ( ! frames[i].descend ) {
					frames[i].column++;
				} else {
					frames[i].column--;
				}
			}, 200));
		}

		const drawBird = (i: number) => {
			let xMod: number;
			let yMod: number;
			let factor = 2 * Math.round(i/2);

			switch (i % 2) {
				case 0:
					xMod = factor * -spriteWidth/3
					yMod = factor * spriteHeight/3
					break;
				case 1:
					xMod = factor * spriteWidth/3
					yMod = factor * spriteHeight/3
					break;
				default:
					xMod = 0;
					yMod = 0;
			}

			baseContext.drawImage(
				birds.plainBirds,
				frames[i].column * frameWidth,
				0,
				frameWidth,
				frameHeight,
				anchorX + xMod,
				anchorY + yMod,
				spriteWidth,
				spriteHeight
			);
		}

		const drawBirds = () => {
			drawSky(baseContext, width);
			for ( let i = 0; i < numBirds; i++ ) {
				drawBird(i);
			}
			window.requestAnimationFrame(drawBirds);
		}

		window.requestAnimationFrame(drawBirds);

		return () => {
			intervals.forEach(i => {
				clearInterval(i);
			})
		}
	}, [birds, intervalId])

	return (
		<>
			<CanvasWrapper width={width} height={height}>
				<BaseCanvas ref={baseCanvasRef} width={width} height={height} />
				<CloudCanvas ref={cloudCanvasRef} width={width} height={height} />
			</CanvasWrapper>
			<PauseButton onClick={handleClick} paused={intervalId === 0} />
		</>
	)
}

export default Canvas;