// GET - /api/fetch-meetups

import { MongoClient } from "mongodb";

const fetchHandler = async (req, res) => {
	if (req.method === "GET") {
		const client = await MongoClient.connect(
			"mongodb+srv://avinash:pVGSNUkIcyY6tKOU@cluster0.xdel4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
		);

		const db = client.db();
		const meetupsCollection = db.collection("meetups");

		const meetups = await meetupsCollection.find().toArray();
		console.log("result: ", meetups);

		client.close();

		res.status(200).json({ meetups });
	}
};

export default fetchHandler;
