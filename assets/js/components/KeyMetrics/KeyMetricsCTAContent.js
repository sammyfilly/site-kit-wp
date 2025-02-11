/**
 * KeyMetricsCTAContent component.
 *
 * Site Kit by Google, Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Cell, Grid, Row } from '../../material-components';
import GhostCardsSVG from './GhostCards';
import { BREAKPOINT_SMALL, useBreakpoint } from '../../hooks/useBreakpoint';

export default function KeyMetricsCTAContent( {
	className,
	title,
	description,
	actions,
} ) {
	const breakpoint = useBreakpoint();
	const isMobileBreakpoint = breakpoint === BREAKPOINT_SMALL;

	return (
		<section
			className={ classnames(
				'googlesitekit-setup__wrapper',
				'googlesitekit-setup__wrapper--key-metrics-setup-cta',
				className
			) }
		>
			<Grid>
				<Row>
					<Cell smSize={ 6 } mdSize={ 5 } lgSize={ 6 }>
						<div className="googlesitekit-widget-key-metrics-text__wrapper">
							<h3 className="googlesitekit-publisher-win__title">
								{ title }
							</h3>
							<p>{ description }</p>
						</div>
						{ isMobileBreakpoint && (
							<Cell className="googlesitekit-widget-key-metrics-svg__wrapper">
								<GhostCardsSVG />
							</Cell>
						) }
						<div className="googlesitekit-widget-key-metrics-actions__wrapper">
							{ actions }
						</div>
					</Cell>
					{ ! isMobileBreakpoint && (
						<Cell
							className="googlesitekit-widget-key-metrics-svg__wrapper"
							smSize={ 6 }
							mdSize={ 3 }
							lgSize={ 6 }
						>
							<GhostCardsSVG />
						</Cell>
					) }
				</Row>
			</Grid>
		</section>
	);
}

KeyMetricsCTAContent.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	actions: PropTypes.node,
};
