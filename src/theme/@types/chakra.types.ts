import {
	ComponentMultiStyleConfig,
	ComponentSingleStyleConfig,
	PartsStyleInterpolation,
	StyleFunctionProps,
	SystemStyleInterpolation,
} from '@chakra-ui/react';

type CustomizedColor = Record<string | number, Record<number, string> | string>;

/**
 * https://chakra-ui.com/docs/styled-system/theme#colors
 */
type Colors = {
	transparent?: 'transparent' | string;
	black?: string;
	white?: string;
} & CustomizedColor;

/**
 * https://chakra-ui.com/docs/styled-system/theme#typography
 */
type Fonts = {
	body?: string;
	heading?: string;
	mono?: string;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#typography
 */
type FontSizes = {
	xs?: `${string}rem`;
	sm?: `${string}rem`;
	md?: `${string}rem`;
	lg?: `${string}rem`;
	xl?: `${string}rem`;
	'2xl'?: `${string}rem`;
	'3xl'?: `${string}rem`;
	'4xl'?: `${string}rem`;
	'5xl'?: `${string}rem`;
	'6xl'?: `${string}rem`;
	'7xl'?: `${string}rem`;
	'8xl'?: `${string}rem`;
	'9xl'?: `${string}rem`;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#typography
 */
type FontWeights = {
	hairline?: number;
	thin?: number;
	light?: number;
	normal?: number;
	medium?: number;
	semibold?: number;
	bold?: number;
	extrabold?: number;
	black?: number;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#typography
 */
type LineHeights = {
	normal?: 'normal' | string;
	none?: number;
	shorter?: number;
	short?: number;
	base?: number;
	tall?: number;
	taller?: string;
	'3'?: `${string}rem`;
	'4'?: `${string}rem`;
	'5'?: `${string}rem`;
	'6'?: `${string}rem`;
	'7'?: `${string}rem`;
	'8'?: `${string}rem`;
	'9'?: `${string}rem`;
	'10'?: `${string}rem`;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#typography
 */
type LetterSpacings = {
	tighter?: `${string}rem`;
	tight?: `${string}rem`;
	normal?: string;
	wide?: `${string}rem`;
	wider?: `${string}rem`;
	widest?: `${string}rem`;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#spacing
 */
type Spacings = {
	space?: {
		px?: `${string}px`;
		0.5?: `${string}rem`;
		1?: `${string}rem`;
		1.5?: `${string}rem`;
		2?: `${string}rem`;
		2.5?: `${string}rem`;
		3?: `${string}rem`;
		3.5?: `${string}rem`;
		4?: `${string}rem`;
		5?: `${string}rem`;
		6?: `${string}rem`;
		7?: `${string}rem`;
		8?: `${string}rem`;
		9?: `${string}rem`;
		10?: `${string}rem`;
		12?: `${string}rem`;
		14?: `${string}rem`;
		16?: `${string}rem`;
		20?: `${string}rem`;
		24?: `${string}rem`;
		28?: `${string}rem`;
		32?: `${string}rem`;
		36?: `${string}rem`;
		40?: `${string}rem`;
		44?: `${string}rem`;
		48?: `${string}rem`;
		52?: `${string}rem`;
		56?: `${string}rem`;
		60?: `${string}rem`;
		64?: `${string}rem`;
		72?: `${string}rem`;
		80?: `${string}rem`;
		96?: `${string}rem`;
	};
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#z-index-values
 */
type ZIndices = {
	zIndices?: {
		hide?: number;
		auto?: 'auto' | string;
		base?: number;
		docked?: number;
		dropdown?: number;
		sticky?: number;
		banner?: number;
		overlay?: number;
		modal?: number;
		popover?: number;
		skipLink?: number;
		toast?: number;
		tooltip?: number;
	};
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#breakpoints
 */
type Breakpoints = {
	sm?: `${string}em`;
	md?: `${string}em`;
	lg?: `${string}em`;
	xl?: `${string}em`;
	'2xl'?: `${string}em`;
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#border-radius
 */
type BorderRadius = {
	radii?: {
		none?: `${string}rem`;
		sm?: `${string}rem`;
		base?: `${string}rem`;
		md?: `${string}rem`;
		lg?: `${string}rem`;
		xl?: `${string}rem`;
		'2xl'?: `${string}rem`;
		'3xl'?: `${string}rem`;
		full?: `${string}rem`;
	};
};

/**
 * https://chakra-ui.com/docs/styled-system/theme#spacing
 */
type Config = {
	cssVarPrefix?: string;
	initialColorMode?: 'light' | 'dark';
	useSystemColorMode?: boolean;
};

interface MultiStyleConfig extends Omit<ComponentMultiStyleConfig, 'variants'> {
	variants?:
		| {
				[key: string]: (
					props: StyleFunctionProps,
				) => Record<string, PartsStyleInterpolation>;
		  }
		| Record<string, PartsStyleInterpolation>;
}

interface SingleStyleConfig
	extends Omit<ComponentSingleStyleConfig, 'variants'> {
	variants?:
		| {
				[key: string]: (
					props: StyleFunctionProps,
				) => Record<string, SystemStyleInterpolation>;
		  }
		| Record<string, SystemStyleInterpolation>;
}

type Component = MultiStyleConfig | SingleStyleConfig;

type Components = Record<string, Component>;

export type {
	Colors,
	Fonts,
	FontSizes,
	FontWeights,
	LineHeights,
	LetterSpacings,
	Spacings,
	Breakpoints,
	ZIndices,
	BorderRadius,
	Config,
	Components,
	Component,
};
