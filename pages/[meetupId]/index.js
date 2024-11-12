import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetingDetails = (props) => {
	return (
		<MeetupDetail
			image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
			title="First Meetup"
			address="Some Street 5, Some City"
			description="This is a first meetup"
		/>
	);
};

export async function getStaticPaths() {
	// in real world we would fetch path data from an API

	return {
		paths: [
			{
				params: {
					meetupId: "m1",
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
			{
				params: {
					meetupId: "m3",
				},
			},
		],

		// if fallback is true, Next.js will generate paths dynamically at the request time
		// if fallback is false, Next.js will generate pages for all paths at build time and fallback to the 404 page
		fallback: "false",
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	// fetch data from an API

	return {
		props: {
			meetupData: {
				id: meetupId,
				title: "First Meetup",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
				address: "Some Street 5, Some City",
				description: "This is a first meetup",
			},
		},

		// for Incremental Static Regeneration (ISR) add the revalidate option.
		revalidate: 9600, // revalidate every 9600 seconds when the new data is added after build
	};
}

export default MeetingDetails;
