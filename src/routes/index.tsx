import { css } from "../css";
import "../app.css";

const title = css.compose({
	"--font-size": "var(--font-size_huge)",
	"--font-weight": "var(--weight_bold)",
	"--bg": "var(--color_white)",
	"--color": "var(--color_black)",
	"--border": "var(--border_solid)",
	"--border-color": "var(--color_black)",
	"--transform": "rotate(-5deg)",
	"--px": 10,
	// "--padding-left": 4,
	// "--padding-right": 4,
	variants: {
		left: {
			true: {
				// "--align-self": "start",
				"--margin-right": 15,
			},
		},
		right: {
			true: {
				"--margin-left": 30,
			},
		},
	},
});

export default function Home() {
	return (
		<div
			style={css({
				"--top": 0,
				"--left": 0,
				"--right": 0,
				"--bottom": 0,
				"--position": "absolute",
				"--background-color": "var(--color_purple-0)",
			})}
		>
			<div
				style={css({
					"--height": "var(--size_full)",
					"--display": "flex",
					"--justify-content": "center",
					"--align-items": "center",
					"--flex-direction": "column",
					"--gap": 2,
				})}
			>
				<div style={title({ left: true })}>YOU</div>
				<div style={title()}>KNOW</div>
				<div style={title({ right: true })}>IT!</div>
			</div>
		</div>
	);
}
