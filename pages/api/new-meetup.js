// POST // /api/new-meetup

function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		console.log(data);
		const { title, image, address, description } = data;

		// store them to DB

		res.status(201).json({ message: "Meetup Created!" });
	}
}

export default handler;
