//SVG pin for use with mapbox gl-js
//not used for final demo, but saving as gl-js example.

import React, { PureComponent } from 'react';

const ICON = `M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z`;
//filled version
//const ICON =
//	'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16.125c-3.383 0-6.125-2.742-6.125-6.125s2.742-6.125 6.125-6.125 6.125 2.742 6.125 6.125-2.742 6.125-6.125 6.125zM12.125 10c0-2.14 1.735-3.875 3.875-3.875s3.875 1.735 3.875 3.875c0 2.14-1.735 3.875-3.875 3.875s-3.875-1.735-3.875-3.875z';
const pinStyle = {
	fill: '#d00',
	stroke: 'none',
	filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))'
};

export default class Pin extends PureComponent {
	render() {
		const { size = 40 } = this.props;

		return (
			<svg height={size} viewBox='0 0 35 35' style={pinStyle}>
				<path d={ICON} />
			</svg>
		);
	}
}
