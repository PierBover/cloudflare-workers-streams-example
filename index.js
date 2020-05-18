import renderPage from './renderPage.js';

addEventListener('fetch', event => {
	event.respondWith(streamResponse(event))
});

async function streamResponse (event) {
	let { readable, writable } = new TransformStream();

	const writer = writable.getWriter();

	event.waitUntil(renderPage(writer));

	return new Response(readable, {
		status: 200,
		headers: {
			'content-type': 'text/html'
		}
	});
}

