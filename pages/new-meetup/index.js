import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
	const router = useRouter();
	const addMeetupHandler = async (enteredMeetupData) => {
		// console.log(enteredMeetupData);
		// send data to API
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// console.log(response);

		const data = await response.json();
		console.log(data);
		router.push(`/${data.meetupId}`);
		return response.ok;
	};
	return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
