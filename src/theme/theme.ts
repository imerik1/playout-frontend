import {
	BorderRadius,
	Breakpoints,
	Colors,
	Components,
	Config,
	FontSizes,
	FontWeights,
	Fonts,
	LetterSpacings,
	LineHeights,
	Spacings,
	ZIndices,
} from '~/theme';

import { extendTheme } from '@chakra-ui/react';

const colors: Colors = {
	black: '#1E1E24',
	white: '#F5FBEF',
	primary: {
		100: '#fcf4da',
		200: '#fbeec8',
		300: '#fae9b5',
		400: '#f9e3a3',
		500: '#f7de91',
		600: '#f6d87e',
		700: '#f5d36c',
		800: '#f4cd5a',
		900: '#f3c848',
	},
	secondary: {
		100: '#333232',
		200: '#4c4b4b',
		300: '#666464',
		400: '#7f7d7d',
		500: '#e5e1e1',
		600: '#b2afaf',
		700: '#ccc8c8',
		800: '#e5e1e1',
		900: '#fffbfb',
	},
};

const fonts: Fonts = {};

const fontSizes: FontSizes = {};

const fontWeights: FontWeights = {};

const lineHeights: LineHeights = {};

const letterSpacings: LetterSpacings = {};

const spacings: Spacings = {};

const zIndices: ZIndices = {};

const breakpoints: Breakpoints = {};

const borderRadius: BorderRadius = {};

const config: Config = {};

const components: Components = {
	Button: {
		variants: {
			primary: {
				bgColor: 'primary.900',
				_hover: {
					bgColor: 'primary.500',
				},
				color: 'black',
				py: 2,
				px: 6,
				borderRadius: 10,
				border: '1px solid black',
			},
			secondary: {
				bgColor: 'secondary.900',
				_hover: {
					bgColor: 'secondary.500',
				},
				color: 'black',
				py: 2,
				px: 6,
				borderRadius: 10,
				border: '1px solid black',
			},
		},
		defaultProps: {
			variants: 'primary',
		},
	},
};

const theme = extendTheme({
	config,
	colors,
	fonts,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	components,
	zIndices,
	breakpoints,
	...spacings,
	...borderRadius,
});

export { theme };
