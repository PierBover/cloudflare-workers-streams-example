addEventListener('fetch', event => {
	event.respondWith(streamResponse(event))
});

function wait () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 1000);
	});
}

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor diam cursus ligula tristique bibendum. Aliquam at erat quis tellus adipiscing tempus. Cras sed rutrum velit. Curabitur vel lacus eget erat tincidunt fringilla nec in ante. Pellentesque lacinia tellus nec neque tempus fermentum. Pellentesque ligula arcu, auctor at sagittis id, imperdiet eget tortor. Pellentesque imperdiet tempus risus non condimentum. Phasellus ut venenatis turpis. Fusce tincidunt nulla sit amet elit lacinia id consequat eros lacinia. Phasellus ut justo velit. Aenean dignissim, nunc vitae molestie blandit, mi diam vehicula ligula, nec vehicula velit sem eu urna. Suspendisse potenti.";

async function asyncWrite(writer) {
	const encoder = new TextEncoder();
	writer.write(encoder.encode(lorem + '\n\n' + lorem + '\n\n'));
	await wait();
	writer.write(encoder.encode(lorem + '\n\n' + lorem + '\n\n'));
	await wait();
	writer.write(encoder.encode(lorem + '\n\n' + lorem + '\n\n'));
	await wait();
	writer.write(encoder.encode(lorem + '\n\n' + lorem + '\n\n'));
	await wait();
	writer.write(encoder.encode(lorem + '\n\n' + lorem + '\n\n'));
	return writer.close();
};

async function streamResponse (event) {
	let { readable, writable } = new TransformStream();

	const writer = writable.getWriter();

	event.waitUntil(asyncWrite(writer));

	return new Response(readable, {
		status: 200
	});
}

