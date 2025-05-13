/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	`./src/*.{html,js}`,
	],
	theme: {
    extend: {},
  },
  plugins: [
	require('daisyui'),
	require('@tailwindcss/typography'),
  ],
  daisyui: {
	themes: [
	{
		ddsnet: {
			"primary": "#134E4A", // teal-900
			"secondary": "#1E40AF", // blue-800
			"accent": "#EF4444", // red-500
			"neutral": "#FFFFFF", // white
			"base-100": "#020617", // slate-950
			"info": "#d946ef",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".375rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "0.25rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		diamondrealm: {
			"primary": "#6F6F89", 
			"secondary": "#2E13BB", 
			"accent": "#CD873E", 
			"neutral": "#1E40AF", 
			"base-100": "#030712", 
			"info": "#d946ef",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".125rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "0.125rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		tokyoconception: {
			"primary": "#531868", 
			"secondary": "#3605B9", 
			"accent": "#157C61", 
			"neutral": "#7268A4", 
			"base-100": "#140026", 
			"info": "#73669B",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": "1.5rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		mikadosamurai: {
			"primary": "#FFFFFF", 
			"secondary": "#DDDDDD", 
			"accent": "#73E128", 
			"neutral": "#FFFFFF", 
			"base-100": "#CCCCCC", 
			"info": "#73669B",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".25rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		nahobino: {
			"primary": "#AAAAAA", 
			"secondary": "#3F64DD", 
			"accent": "#8EB846", 
			"neutral": "#FFFFFF", 
			"base-100": "#0f172a", 
			"info": "#73669B",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".25rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "1.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		arcticjourney: {
			"primary": "#2662B8", 
			"secondary": "#0A63B7", 
			"accent": "#7099C5", 
			"neutral": "#82AAB6", 
			"base-100": "#022859", 
			"info": "#73669B",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".25rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": ".125rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".125rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		velvetmoonlight: {
			"primary": "#0B27B6", 
			"secondary": "#1039F5", 
			"accent": "#57A5FA", 
			"neutral": "#82AAB6", 
			"base-100": "#0C0225", 
			"info": "#FEFEFF",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".5rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": ".25rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".25rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": ".95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		goldenglow: {
			"primary": "#FCAC15", 
			"secondary": "#FFFC01", 
			"accent": "#FCAC15", 
			"neutral": "#A7FF1C", 
			"base-100": "#422006", 
			"info": "#FEFEFF",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": "1.5rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": "1rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".25rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": ".95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		},
		phantomthief: {
			"primary": "#FB0003", 
			"secondary": "#FB0003", 
			"accent": "#FFF", 
			"neutral": "#FFFFFF", 
			"base-100": "#450a0a", 
			"info": "#FEFEFF",
			"success": "#00ff00",
			"warning": "#eab308",
			"error": "#ff0000",
			"--rounded-box": ".125rem", // border radius rounded-box utility class, used in card and other large boxes
       		"--rounded-btn": ".25rem", // border radius rounded-btn utility class, used in buttons and similar element
        	"--rounded-badge": ".25rem", // border radius rounded-badge utility class, used in badges and similar
    		"--animation-btn": "0.25s", // duration of animation when you click on button
        	"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
        	"--btn-focus-scale": ".95", // scale transform of button when you focus on it
        	"--border-btn": "1px", // border width of buttons
        	"--tab-border": "1px", // border width of tabs
        	"--tab-radius": "0.125rem", // border radius of tabs
		}
	},
	"synthwave",
	"halloween",
	"forest",
	"business",
	"coffee",
	"sunset",
	],
  },
}

