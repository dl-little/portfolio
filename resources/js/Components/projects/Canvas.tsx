import { useRef, useEffect } from 'react';

interface ICanvas {
	width: number
	height: number
}

// Updated a few things, but this is the reference:
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const Canvas: React.FC<ICanvas> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {

		if ( ! canvasRef.current ) {
			return;
		}

		const canvas = canvasRef.current
		const context = canvas.getContext('2d')

		if ( ! context ) {
			return;
		}

		// Our first draw
		context.fillStyle = '#87ceeb';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	
	  }, [])

	return (
		<canvas ref={canvasRef} {...props} />
	)
}

export default Canvas;