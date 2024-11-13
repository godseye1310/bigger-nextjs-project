import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetingDetails = ({ meetupData }) => {
	// console.log(meetupData);
	// const {image, title, address, description} = meetupData

	return (
		<>
			<Head>
				<title>{meetupData.title}</title>
				<meta name="description" content={meetupData.description} />
			</Head>
			<MeetupDetail {...meetupData} />;
		</>
	);
};

export async function getStaticPaths() {
	// in real world we would fetch path data from an API

	const apiUrl = process.env.NEXT_PUBLIC_API_URL
		? `${process.env.NEXT_PUBLIC_API_URL}api/fetch-meetups`
		: "http://localhost:3000/api/fetch-meetups";

	const response = await fetch(apiUrl, {
		method: "GET",
	});
	const data = await response.json();

	// Get the paths we want to pre-render based on posts
	const paths = data.meetups.map((meetup) => ({
		params: { meetupId: meetup._id.toString() },
	}));

	return {
		paths,

		// if fallback is true, Next.js will generate paths dynamically at the request time
		// if fallback is false, Next.js will generate pages for all paths at build time and fallback to the 404 page
		// if fallback is "blocking", Next.js will generate paths dynamically at the request time
		fallback: "blocking",
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	console.log("meetupId: ", meetupId);

	// Convert meetupId to ObjectId
	const objectId = ObjectId.createFromHexString(meetupId);

	// fetch data from an API
	const client = await MongoClient.connect(
		"mongodb+srv://avinash:pVGSNUkIcyY6tKOU@cluster0.xdel4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const meetupDetails = await meetupsCollection.findOne({
		_id: objectId,
	});
	console.log("meetupDetails: ", meetupDetails);

	const meetupData = {
		id: meetupDetails._id.toString(),
		title: meetupDetails.title,
		image: meetupDetails.image,
		address: meetupDetails.address,
		description: meetupDetails.description,
	};

	client.close();

	return {
		props: {
			meetupData: meetupData,
		},

		// for Incremental Static Regeneration (ISR) add the revalidate option.
		revalidate: 1, // revalidate every 9600 seconds when the new data is added after build
	};
}

export default MeetingDetails;
