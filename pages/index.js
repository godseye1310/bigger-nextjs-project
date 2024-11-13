import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
// 	{
// 		id: "m1",
// 		title: "Tech Talk: AI and the Future",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
// 		address: "123 Tech Street, San Francisco, CA",
// 		description:
// 			"Join us for a discussion on the latest developments in AI and how they will shape the future of technology. Expert speakers and live demos included.",
// 	},
// 	{
// 		id: "m2",
// 		title: "Yoga for Beginners",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Skyline_of_Cannaught_Place%2C_New_Delhi.jpg/1024px-Skyline_of_Cannaught_Place%2C_New_Delhi.jpg",
// 		address: "456 Wellness Blvd, Los Angeles, CA",
// 		description:
// 			"Start your journey to wellness with this beginner-friendly yoga session. Learn basic poses, breathing techniques, and ways to relieve stress.",
// 	},
// 	{
// 		id: "m3",
// 		title: "Photography Walk: Urban Landscape",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seimon_Ishibashi.JPG/1024px-Seimon_Ishibashi.JPG",
// 		address: "789 City Park, New York, NY",
// 		description:
// 			"Capture stunning urban landscapes during this photography walk. Whether you're a beginner or pro, bring your camera and explore the city's architecture.",
// 	},
// 	{
// 		id: "m4",
// 		title: "Startup Networking Night",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg",
// 		address: "101 Business Ave, Chicago, IL",
// 		description:
// 			"Meet like-minded entrepreneurs and startups at this networking event. Perfect for finding collaborators, investors, or just exchanging ideas.",
// 	},
// 	{
// 		id: "m5",
// 		title: "Book Club: Sci-Fi Classics",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rainbow_colored_Rainbow_Bridge_at_night.jpg",
// 		address: "202 Library Lane, Seattle, WA",
// 		description:
// 			"This month’s book club discussion will focus on classic science fiction novels. Join us for lively conversation and book recommendations.",
// 	},
// ];

const HomePage = (props) => {
	// console.log(props.meetups);
	return <MeetupList meetups={props.meetups} />;
};

// The getStaticProps() function is called at build time to SSG (Static Site Generation) the page.
export async function getStaticProps() {
	// fetch data from an API
	// http://localhost:3000/api/fetch-meetups // monogoDB needs a valid url not a relative path
	const response = await fetch("http://localhost:3000/api/fetch-meetups", {
		method: "GET",
	});
	const data = await response.json();
	// console.log("meetups-data :", data.meetups);

	//(we can write the mongoDB connection code here itself to get the data from DB)

	return {
		props: {
			meetups: data.meetups,
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
