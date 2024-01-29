import { memo } from 'react';
import cn from 'classnames';

import css from './style.module.css';

export const SquareItem = memo(({size, id, handleSquareMouseEnter, handleSquareMouseLeave, isSquareActive}: {size: number, id: string, handleSquareMouseEnter: (arg0: string) => void, handleSquareMouseLeave: (arg0: string) => void, isSquareActive: boolean}) => {
	let timeoutId: NodeJS.Timeout;

	const hoverProps = {
		onMouseEnter: () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				if (isSquareActive) {
					handleSquareMouseLeave(id)	
				} else {
					handleSquareMouseEnter(id)
				}
			}, 1000)
		},
		onMouseLeave: () => {
			clearTimeout(timeoutId);
		}
	}

	return (
		<div {...hoverProps} style={{width: size, height: size}} className={cn(css.square, {[css.active]: isSquareActive})}/>
	)
})