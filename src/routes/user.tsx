const user = () => {
	"use server";
	console.log(process.env);
};

export default function User() {
	console.log(import.meta.env);

	return (
		<div>
			<button onclick={user}>hey</button>
		</div>
	);
}
