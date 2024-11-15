import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
	// console.log(props.meetups);
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

// The getStaticProps() function is called at build time to SSG (Static Site Generation) the page.
export async function getStaticProps() {
	// fetch data from an API
	// http://localhost:3000/api/fetch-meetups // monogoDB needs a valid url not a relative path
	// const response = await fetch("http://localhost:3000/api/fetch-meetups", {
	// 	method: "GET",
	// });
	// const data = await response.json();
	// console.log("meetups-data :", data.meetups);

	//(we can write the mongoDB connection code here itself to get the data from DB)

	const client = await MongoClient.connect(
		"mongodb+srv://avinash:pVGSNUkIcyY6tKOU@cluster0.xdel4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},

		// for Incremental Static Regeneration (ISR) add the revalidate option.
		revalidate: 3, // revalidate every 9600 seconds when the new data is added after build
	};
}

// // The getServerSideProps() function is called at request time to SSR (Server Side Rendering) the page.
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	// fetch data from an API
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},

// 		// no revalidation for SSR pages
// 	};
// }

export default HomePage;
