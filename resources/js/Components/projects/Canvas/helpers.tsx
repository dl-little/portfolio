import { ICell } from "./Canvas";

export const getCellDimensions = ( width: number, columns: number ) => {
	return width / columns;
}

const drawColumns = ( context: CanvasRenderingContext2D, width: number, height: number, factor: number ) => {
	for ( let i = 0; i <= width; i += factor ) {
		context.moveTo(i, 0);
    	context.lineTo(i, height);
	}
}

const drawRows = ( context: CanvasRenderingContext2D, width: number, height: number, factor: number ) => {
	for ( let i = 0; i <= height; i += factor ) {
		context.moveTo(0, i);
    	context.lineTo(width, i);
	}
}

export const drawGrid = ( context: CanvasRenderingContext2D, width: number, height: number, columns: number ) => {
	const factor = getCellDimensions(width, columns);
	drawColumns(context, width, height, factor);
	drawRows(context, width, height, factor);
	context.lineWidth = 1;
	context.stroke();
}

export const getCells = ( width: number, columns: number ) => {
	const cells = [];
	const factor = getCellDimensions(width, columns);
	const rows = columns / 2;
	const numberOfCells = rows * columns;
	let y = 0;
	let x = 0;

	for ( let i = 0; i < numberOfCells; i++ ) {
		cells.push({
			index: i,
			rect: {
				x: x,
				y: y,
				cellWidth: factor,
				cellHeight: factor
			},
			neighbors: {
				next: ( i + 1 ) % numberOfCells,
				prev: ( i - 1 ) % numberOfCells,
				top: ( i - columns ) % numberOfCells,
				topLeft: ( i - ( columns + 1 ) ) % numberOfCells,
				topRight: ( i - ( columns - 1 ) ) % numberOfCells,
				bottom: ( i + columns ) % numberOfCells,
				bottomLeft: ( i + ( columns - 1 ) ) % numberOfCells,
				bottomRight: ( i + ( columns + 1 ) ) % numberOfCells,
			},
			position: {
				top: i <= columns - 1,
				rightEdge: i % columns === columns - 1,
				bottom: i >= numberOfCells - columns,
				leftEdge: i % columns === 0,
			},
			seedCloud: Math.random() < .1
		});

		if ( i % columns === columns - 1 ) {
			y += factor;
			x = 0;
		} else {
			x += factor;
		}
	}

	return cells;
}

export const getClouds = (cells: ICell[]) => {
	const cLouds: ICell[] = [];
	const cLusters: any[] = [];
	const cloudSeeds = cells.filter(cell => {
		return cell.seedCloud;
	})

	cloudSeeds.forEach(cell => {
		cLouds.push(cell);
		Object.values(cell.neighbors).forEach(value => {
			if ( value > 0 && ! cLouds.includes(cells[value]) ) {
				cLouds.push(cells[value]);
			}
		})
	})

	const edges = cLouds.filter(cell => {
		return cell.position.top
			|| cell.position.rightEdge
			|| cell.position.bottom
			|| cell.position.leftEdge
	});

	cloudSeeds.forEach(cell => {
		if ( cell.neighbors.topLeft > 0 ) {
			cLusters.push({
				x: cells[cell.neighbors.topLeft].rect.x,
				y: cells[cell.neighbors.topLeft].rect.y,
				clusterWidth: cell.rect.cellWidth * 3,
				clusterHeight: cell.rect.cellHeight * 3
			})
		}
	})

	return {
		cLouds,
		edges,
		cLusters
	}
}

export const drawClouds = (context: CanvasRenderingContext2D, clouds: ICell[]) => {
	clouds.forEach(cell => {
		const { x, y, cellWidth, cellHeight } = cell.rect;
		context.fillStyle = '#FFFFFF';
		context.fillRect(x, y, cellWidth, cellHeight);
	})
}

interface ICluster {
	x: number
	y: number
	clusterWidth: number
	clusterHeight: number
}

export const drawClusters = (context: CanvasRenderingContext2D, clusters: ICluster[]) => {
	clusters.forEach(cluster => {
		const { x, y, clusterWidth, clusterHeight } = cluster;
		context.fillStyle = '#FFFFFF';
		context.fillRect(x, y, clusterWidth, clusterHeight);
	})
}

export const drawSky = (context: CanvasRenderingContext2D, width: number) => {
	context.save();
	context.fillStyle = '#87CEEB';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	context.restore();
}

export const shiftClouds = (cells: ICell[], width: number, height: number) => {
	const newClouds = [...cells];

	for ( let i = 0; i < newClouds.length; i++ ) {

		if ( newClouds[i].position.top ) {
			newClouds[i].rect.y = height - newClouds[i].rect.cellHeight;
			newClouds[i].position.top = !newClouds[i].position.top;
			continue;
		} else if ( newClouds[i].position.rightEdge ) {
			newClouds[i].rect.x = 0;
			newClouds[i].position.rightEdge = !newClouds[i].position.rightEdge;
			continue;
		}

		newClouds[i].rect.y -= newClouds[i].rect.cellHeight;
		newClouds[i].rect.x += newClouds[i].rect.cellWidth;

		if ( newClouds[i].rect.y === 0 ) {
			newClouds[i].position.top = !newClouds[i].position.top;
		} else if ( newClouds[i].rect.x === width - newClouds[i].rect.cellWidth ) {
			newClouds[i].position.rightEdge = !newClouds[i].position.rightEdge;
		}
	}

	return newClouds;
}

export const shiftClusters = (clusters: ICluster[], width: number, height: number) => {
	const newClusters = [...clusters];

	for ( let i = 0; i < newClusters.length; i++ ) {
		if ( newClusters[i].y === height + newClusters[i].clusterHeight ) {
			newClusters[i].y = 0 - newClusters[i].clusterHeight;
			continue;
		} else if ( newClusters[i].x === width + newClusters[i].clusterWidth ) {
			newClusters[i].x = 0 - newClusters[i].clusterWidth;
			continue;
		}

		newClusters[i].y += newClusters[i].clusterHeight / 3;
		newClusters[i].x += newClusters[i].clusterWidth / 3;
	}

	return newClusters;
}

const loadImage = (url: string) => {
	return new Promise<HTMLImageElement>(r => {
		const image = new Image();
		image.onload = (() => r(image));
		image.src = url;
	})
}

export const loadBirds = async () => {
	const plainBirds = await loadImage('/images/birdSprites.png');
	const blueBirds = await loadImage('/images/birdSpritesBlue.png');
	return {
		plainBirds,
		blueBirds
	}
}
interface IPoint {
	x: number
	y: number
}
// Modified from https://gist.github.com/conorbuck/2606166
export const getAngleDeg = (anchor: IPoint, point: IPoint) => {
	return Math.atan2(point.y - anchor.y, point.x - anchor.x) * 180 / Math.PI;
}

export const clamp = (num: number, min: number, max: number) => {
	return num <= min ? min : num >= max ? max : num;
}
