export const getSquareConfig = async () => {
	try {
		const response = await fetch('https://60816d9073292b0017cdd833.mockapi.io/modes', {
			method: 'GET'
		})
		const data = await response.json();
		
		return [null, data]
	} catch (err) {
		return [err, null]
	}
}