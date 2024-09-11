export default function updateIframe() {
	const iframe = document.getElementById('video-iframe') as HTMLIFrameElement
	const params = new URLSearchParams(window.location.search)

	if (params.size === 0) {
		return null
	}

	const watch = params.get('watch')
	const id = params.get('id')
	const season = params.get('season')
	const episode = params.get('episode')

	iframe.style.display = 'block'

	if (!season && !episode) {
		iframe.src = `https://vidsrc.cc/v2/embed/${watch}/${id}`
		return
	} else {
		iframe.src = `https://vidsrc.cc/v2/embed/${watch}/${id}/${season}/${episode}`
	}
}
