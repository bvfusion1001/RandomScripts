var daysPerWeek = 7;
var hoursPerDay = 8;
var minutesPerHour = 60;

function calculateHours(timeText) {
	// Don't define regex globally so it resets for each use
	var timeRegex = /(?:(\d+) weeks?)?(?:, )?(?:(\d+) days?)?(?:, )?(?:(\d+) hours?)?(?:, )?(?:(\d+) minutes?)?/g;

	var matches = timeRegex.exec(timeText);
	var weeks = parseInt(matches[1] || 0);
	var days = parseInt(matches[2] || 0);
	var hours = parseInt(matches[3] || 0);
	var minutes = parseInt(matches[4] || 0);

	var totalHours =
		(weeks * daysPerWeek * hoursPerDay) + 
		(days * hoursPerDay) + 
		hours + 
		(minutes / minutesPerHour);
	return totalHours;
}

function getTotalHours(cells) {
	var totalHours = 0;
	cells.each(function(i, e) {
		var hours = calculateHours(e.innerText);
		totalHours += hours;
	});
	return totalHours;
}

function addHoursToTable(cellClass) {
	//TODO: Update to accept an array of classes
	
	var cells = $('.' + cellClass);

	var totalHours = getTotalHours(cells);
	var hourText = totalHours + ' Hour' + (totalHours !== 1 ? 's' : '');

	var cell = cells.first();
	var rowLength = cell.siblings().length;
	var cellIndex = $($('.' + cellClass).first()).index();	
	var totalsRow = $('<tr></tr>')
	for (var i = 0; i < rowLength; i++) {
		var td = $('<td></td>');
		if (i === cellIndex) {
			td.html(hourText);
		}
		totalsRow.append(td);
	}
	$('#issuetable tr:last').after(totalsRow);
}

// JQL:
// Sprint = 273 && assignee = "Omar.Rodriguez@Nintex.com"
var remainingEstimateCellClass = 'timeestimate';
var originalEstimateCellClass = 'timeoriginalestimate';
var classes = [remainingEstimateCellClass, originalEstimateCellClass];


addHoursToTable(remainingEstimateCellClass);
