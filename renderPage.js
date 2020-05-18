const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor diam cursus ligula tristique bibendum. Aliquam at erat quis tellus adipiscing tempus. Cras sed rutrum velit. Curabitur vel lacus eget erat tincidunt fringilla nec in ante. Pellentesque lacinia tellus nec neque tempus fermentum. Pellentesque ligula arcu, auctor at sagittis id, imperdiet eget tortor. Pellentesque imperdiet tempus risus non condimentum. Phasellus ut venenatis turpis. Fusce tincidunt nulla sit amet elit lacinia id consequat eros lacinia. Phasellus ut justo velit. Aenean dignissim, nunc vitae molestie blandit, mi diam vehicula ligula, nec vehicula velit sem eu urna. Suspendisse potenti.";

function getAsyncLorem () {
	const delay = Math.round(500 * Math.random());

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(lorem);
		}, delay);
	});
}

const head = `
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<body>
<h1>Hello Stream</h1>
`;

const end = `
</body>
</html>
`;

export default async (writer) => {
	const encoder = new TextEncoder();
	writer.write(encoder.encode(head));

	for (var i = 0; i < 10; i++) {
		const lorem = await getAsyncLorem();
		writer.write(encoder.encode(`<p>${lorem}</p>`));
	}

	writer.write(encoder.encode(end));
	return writer.close();
};