import { useForm, SubmitHandler } from "react-hook-form"
import { Input, Select } from "antd"
import { ISquareConfig } from "@src/types"

import css from './style.module.css';
import { Squares } from "./Squares";
import { BoardActions, useBoardDispatch } from "@src/contexts";
import { useCallback } from "react";
import { ActiveSquares } from "./ActiveSquares";

type Inputs = {
  mode: string
}

export const Board = ({squareConfig, pickedMode, activeSquares}: {squareConfig: ISquareConfig[], pickedMode: string | null, activeSquares: string[]}) => {
	const { register, handleSubmit, watch, setValue } = useForm<Inputs>()
	const dispatch = useBoardDispatch();
	const mode = watch('mode');
	const modeOptions = squareConfig.map((item) => ({value: item.id, label: item.name}))

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const {mode} = data;
		dispatch({type: BoardActions.PICKED_MODE_UPDATE, payload: mode})
	}
	const handleSquareMouseEnter = useCallback((id: string) => {
		dispatch({type: BoardActions.ADD_ACTIVE_SQUARE, payload: id})
	}, [dispatch])
	const handleSquareMouseLeave = useCallback((id: string) => {
		dispatch({type: BoardActions.DELETE_ACTIVE_SQUARE, payload: id})
	}, [dispatch])

	return (
		<div className={css.wrapper}>
			{/* also we can move form and separate it's parts to components, to prevent rerenders when common state changes */}
			{/* but here I did it only for board components */}
			<form onSubmit={handleSubmit(onSubmit)} className={css.form}>
				<Select
					{...register("mode")}
					onChange={(v) => setValue('mode', v)}
					options={modeOptions}
					className={css.select}
					placeholder='Pick mode'
				/>
				<Input disabled={!mode} className={css.submit} type="submit" value="Start" />
			</form>
			<div className={css.contentWrapper}>
				{pickedMode && (
					<Squares activeSquares={activeSquares} mode={pickedMode} squaresConfig={squareConfig} handleSquareMouseEnter={handleSquareMouseEnter} handleSquareMouseLeave={handleSquareMouseLeave}/>
				)}
				{activeSquares && pickedMode && (
					<ActiveSquares activeSquares={activeSquares}/>
				)}
			</div>
		</div>
	)
}