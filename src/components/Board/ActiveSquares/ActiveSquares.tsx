export const ActiveSquares = ({activeSquares}: {activeSquares: string[]}) => {
	return (
		<div>
			<h4>Hovered squares</h4>
			{activeSquares.map((squareId) => {
				const decodedId = squareId.split('.');

				return <p key={squareId}>{`row ${+decodedId[0] + 1} column ${+decodedId[1] + 1}`}</p>
			})}
		</div>
	)
}