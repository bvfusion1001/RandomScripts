var $issueTable = jQuery('#issuetable');
var $rows = $issueTable.find('tr');

var issueDescription = [];
$rows.each(function(i, row) {
	if (i) {
	    var issueNumber = $(row).find('.issuekey a.issue-link').data('issue-key');
	    var issueSummary = $(row).find('.summary a.issue-link').text();
	    issueDescription.push('* ' + issueNumber + ' - ' + issueSummary);
	}
});
copy(issueDescription.join('\n'));
