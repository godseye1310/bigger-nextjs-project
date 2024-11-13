// POST // /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		// console.log(data);
		// const { title, image, address, description } = data;

		// store them to DB
		const client = await MongoClient.connect(
			"mongodb+srv://avinash:pVGSNUkIcyY6tKOU@cluster0.xdel4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
		);

		const db = client.db();
		const meetupsCollection = db.collection("meetups");
		const result = await meetupsCollection.insertOne(data);
		console.log(result);
		client.close();

		// send response
		res.status(201).json({
			message: "Meetup Created!",
			meetupId: result.insertedId,
		});
	}
}

export default handler;

// mongodb+srv://avinash:<db_password>@cluster0.xdel4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
