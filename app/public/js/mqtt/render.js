function ChartView() {
	window.onload = function () {

var syntheticTemp = new CanvasJS.Chart("chartContainer", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Temperature"
		},
		axisY :{
			includeZero: false,
			title: "Fahrenheit",
			suffix: "F"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00 F",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.temperature+" }," %>
			 <% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00 F",
			name: "Node 2",
			dataPoints: [
				<% listN2.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.temperature+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00 F",
			name: "Node 3",
			dataPoints: [
				<% listN3.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.temperature+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00 F",
			name: "Node 4",
			dataPoints: [
				<% listN4.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.temperature+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 F",
			name: "Node 5",
			dataPoints: [
				<% listN5.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.temperature+" }," %>
				<% }); %>
			]
		}]
	});
	//---------------------------------------------
//-------------------------------------------------------
var syntheticHumid = new CanvasJS.Chart("chartContainer2", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Humidity"
		},
		axisY :{
			includeZero: false,
			title: "%",
			suffix: "%"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.humidity+" }," %>
			 <% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00",
			name: "Node 2",
			dataPoints: [
				<% listN2.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.humidity+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00",
			name: "Node 3",
			dataPoints: [
				<% listN3.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.humidity+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			visible: true,
			yValueFormatString: "##.00",
			name: "Node 4",
			dataPoints: [
				<% listN4.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.humidity+" }," %>
				<% }); %>
			]
		},
		{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 5",
			dataPoints: [
				<% listN5.rows.forEach(function(dl) { %>
				<%= "{ y: "+dl.humidity+" }," %>
				<% }); %>
			]
		}]
	});
	////////////////////////////
var floor1T = new CanvasJS.Chart("chartContainer3", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Humidity"
		},
		axisY :{
			includeZero: false,
			title: "%",
			suffix: "%"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.temperature+" }," %>
			 <% }); %>
			]
		}]
	});
var floor1H = new CanvasJS.Chart("chartContainer4", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Humidity"
		},
		axisY :{
			includeZero: false,
			title: "%",
			suffix: "%"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.humidity+" }," %>
			 <% }); %>
			]
		}]
	});
	////////////////////////////////////////////
var floor2T = new CanvasJS.Chart("chartContainer5", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Humidity"
		},
		axisY :{
			includeZero: false,
			title: "%",
			suffix: "%"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.temperature+" }," %>
			 <% }); %>
			]
		}]
	});
var floor2H = new CanvasJS.Chart("chartContainer6", {
		theme:"light2",
		animationEnabled: true,
		title:{
			text: "Humidity"
		},
		axisY :{
			includeZero: false,
			title: "%",
			suffix: "%"
		},
		toolTip: {
			shared: "true"
		},
		legend:{
			cursor:"pointer",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			visible: true,
			showInLegend: true,
			yValueFormatString: "##.00",
			name: "Node 1",
			dataPoints: [
			 <% listN1.rows.forEach(function(dl) { %>
			 <%= "{ y: "+dl.humidity+" }," %>
			 <% }); %>
			]
		}]
	});
///////////////////////////////////////////
var floor3T = new CanvasJS.Chart("chartContainer7", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN1.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor3H = new CanvasJS.Chart("chartContainer8", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN1.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
///////////////////////////////////////////
var floor4T = new CanvasJS.Chart("chartContainer9", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN1.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor4H = new CanvasJS.Chart("chartContainer10", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN1.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
//////////////////////////////////////////
var floor5T = new CanvasJS.Chart("chartContainer11", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN1.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor5H = new CanvasJS.Chart("chartContainer12", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN5.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
///////////////////////////////////////////
////////////////////////////
var floor6T = new CanvasJS.Chart("chartContainer13", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN6.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor6H = new CanvasJS.Chart("chartContainer14", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN6.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
////////////////////////////////////////////
var floor7T = new CanvasJS.Chart("chartContainer15", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN7.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor7H = new CanvasJS.Chart("chartContainer16", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN7.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
///////////////////////////////////////////
var floor8T = new CanvasJS.Chart("chartContainer17", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN8.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor8H = new CanvasJS.Chart("chartContainer18", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN8.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
///////////////////////////////////////////
var floor9T = new CanvasJS.Chart("chartContainer19", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN9.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.temperature+" }," %>
		 <% }); %>
		]
	}]
});
var floor9H = new CanvasJS.Chart("chartContainer20", {
	theme:"light2",
	animationEnabled: true,
	title:{
		text: "Humidity"
	},
	axisY :{
		includeZero: false,
		title: "%",
		suffix: "%"
	},
	toolTip: {
		shared: "true"
	},
	legend:{
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	data: [{
		type: "spline",
		visible: true,
		showInLegend: true,
		yValueFormatString: "##.00",
		name: "Node 1",
		dataPoints: [
		 <% listN9.rows.forEach(function(dl) { %>
		 <%= "{ y: "+dl.humidity+" }," %>
		 <% }); %>
		]
	}]
});
//////////////////////////////////////////
///////////////////////////////////////////
	syntheticTemp.render();
	syntheticHumid.render();
	floor1T.render();
	floor1H.render();
	floor2T.render();
	floor2H.render();
	floor3T.render();
	floor3H.render();
	floor4T.render();
	floor4H.render();
	floor5T.render();
	floor5H.render();
	floor6T.render();
	floor6H.render();
	floor7T.render();
	floor7H.render();
	floor8T.render();
	floor8H.render();
	floor9T.render();
	floor9H.render();
	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		syntheticTemp.render();
		syntheticHumid.render();
		floor1T.render();
		floor1H.render();
		floor2T.render();
		floor2H.render();
		floor3T.render();
		floor3H.render();
		floor4T.render();
		floor4H.render();
		floor5T.render();
		floor5H.render();
		floor6T.render();
		floor6H.render();
		floor7T.render();
		floor7H.render();
		floor8T.render();
		floor8H.render();
		floor9T.render();
		floor9H.render();
		}
	}
}

$(document).ready(function() {
    ChartView();
});
