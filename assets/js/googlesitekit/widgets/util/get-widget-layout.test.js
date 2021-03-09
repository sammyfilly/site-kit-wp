/**
 * Widgets layout utilities tests.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
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
 * Internal dependencies
 */
import { getWidgetLayout } from './get-widget-layout';
import { WIDGET_WIDTHS } from '../datastore/constants';
import Null from '../../../components/Null';

describe( 'getWidgetLayout', () => {
	const quarter = { width: WIDGET_WIDTHS.QUARTER };
	const half = { width: WIDGET_WIDTHS.HALF };
	const full = { width: WIDGET_WIDTHS.FULL };
	const quarterOrHalf = { width: [ WIDGET_WIDTHS.QUARTER, WIDGET_WIDTHS.HALF ] };
	const halfOrQuarter = { width: [ WIDGET_WIDTHS.HALF, WIDGET_WIDTHS.QUARTER ] };
	const fullOrHalf = { width: [ WIDGET_WIDTHS.FULL, WIDGET_WIDTHS.HALF ] };

	const getQuarterWidget = ( slug ) => ( { slug, width: WIDGET_WIDTHS.QUARTER } );
	const getHalfWidget = ( slug ) => ( { slug, width: WIDGET_WIDTHS.HALF } );
	const getFullWidget = ( slug ) => ( { slug, width: WIDGET_WIDTHS.FULL } );
	const getHalfOrFullWidget = ( slug ) => ( { slug, width: [ WIDGET_WIDTHS.HALF, WIDGET_WIDTHS.FULL ] } );

	const getRegularState = () => null;
	const getNullState = () => ( { Component: Null, metadata: {} } );

	it( 'computes expected column widths in a single row', () => {
		const widgets = [
			getQuarterWidget( 'test1' ),
			getHalfWidget( 'test2' ),
			getQuarterWidget( 'test3' ),
		];
		const widgetStates = {
			test1: getRegularState(),
			test2: getRegularState(),
			test3: getRegularState(),
		};

		const expectedColumnWidths = [ 3, 6, 3 ];
		const expectedRowIndexes = [ 0, 0, 0 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'computes expected column widths across multiple rows', () => {
		const widgets = [ half, half, full, quarter, half, quarter, quarter, quarter, quarter, quarter ];
		const widgetStates = {};
		const expectedColumnWidths = [ 6, 6, 12, 3, 6, 3, 3, 3, 3, 3 ];
		const expectedRowIndexes = [ 0, 0, 1, 2, 2, 2, 3, 3, 3, 3 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'expands 3/4 rows into full-width rows', () => {
		const widgets = [ half, quarter, full, quarter, quarter, quarter, half, quarter ];
		const widgetStates = {};
		const expectedColumnWidths = [ 8, 4, 12, 4, 4, 4, 8, 4 ];
		const expectedRowIndexes = [ 0, 0, 1, 2, 2, 2, 3, 3 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'chooses best supported widget width to fit single row', () => {
		const widgets = [ quarter, quarterOrHalf, fullOrHalf ];
		const widgetStates = {};
		const expectedColumnWidths = [ 3, 3, 6 ];
		const expectedRowIndexes = [ 0, 0, 0 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'chooses best supported widget width to fit multiple rows', () => {
		const widgets = [ quarter, halfOrQuarter, fullOrHalf, halfOrQuarter, fullOrHalf ];
		const widgetStates = {};
		const expectedColumnWidths = [ 3, 3, 6, 4, 8 ];
		const expectedRowIndexes = [ 0, 0, 0, 1, 1 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'chooses best supported widget width when the last widget is inactive', () => {
		const widgets = [
			getHalfOrFullWidget( 'widget1' ),
			getHalfWidget( 'widget2' ),
		];
		const widgetStates = {
			widget1: getRegularState(),
			widget2: getNullState(),
		};
		const expectedColumnWidths = [ 12, 0 ];
		const expectedRowIndexes = [ 0, 1 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );

	it( 'chooses best supported widget width when a widget is inactive', () => {
		const widgets = [
			getHalfOrFullWidget( 'widget1' ),
			getHalfWidget( 'widget2' ),
			getFullWidget( 'widget3' ),
		];
		const widgetStates = {
			widget1: getRegularState(),
			widget2: getNullState(),
			widget3: getRegularState(),
		};
		const expectedColumnWidths = [ 12, 0, 12 ];
		const expectedRowIndexes = [ 0, 1, 1 ];

		const { columnWidths, rowIndexes } = getWidgetLayout( widgets, widgetStates );
		expect( columnWidths ).toEqual( expectedColumnWidths );
		expect( rowIndexes ).toEqual( expectedRowIndexes );
	} );
} );
