import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";

export default function Home() {
	return (
		<main>
			<Title>Hello World</Title>
			<h1>Hello world!</h1>
			<Counter />
			<p>
				Visit{" "}
				<a href="https://start.solidjs.com" target="_blank">
					start.solidjs.com
				</a>{" "}
			</p>
			{import.meta.env.VITE_TEST}
			{/* {process.env.test} */}
		</main>
	);
}
