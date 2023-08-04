const queryParams = new URLSearchParams(window.location.search)

if (queryParams.has('id')) {
	const id = queryParams.get('id')
	console.log('ID:', id)
}

if (queryParams.has('s')) {
	const season = queryParams.get('s')
	console.log('Season:', season)
}
