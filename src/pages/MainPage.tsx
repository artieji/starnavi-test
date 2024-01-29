import { Board } from "@src/components"
import { useBoardState } from "@src/contexts"

export const MainPage = () => {
	const { squareConfig, pickedMode, activeSquares } = useBoardState();
	
	return (
		<Board squareConfig={squareConfig} pickedMode={pickedMode} activeSquares={activeSquares} />
	)
}