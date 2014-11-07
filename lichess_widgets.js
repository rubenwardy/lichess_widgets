var lichess = {};
var serial = 0;
lichess.challenge_me = function(author, text) {
	if (text == null)
		text = author;
	var tmp = "<a class=\"lichess_widget\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
	tmp    += "<span>" + text + "</span></a>";
	document.write(tmp);
};
lichess.all_scores = function(author, text) {
	serial++;
	var id = serial;
	if (text == undefined)
		text = author;
	var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
	tmp    += "<span>Loading...</span></a>";
	document.write(tmp);
	$.ajax({
		url: "http://en.lichess.org/api/user/" + author,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			if (text && text != "")
				text = text + " | ";
			$("#lichess_widget_" + id + " > span").text(text + "Classical: " + data.perfs.classical.rating + " | Bullet: " + data.perfs.bullet.rating);
		}
	});
};
lichess.long_details = function(author) {
	serial++;
	var id = serial;
	var tmp = "<a id=\"lichess_long_" + author + "\" class=\"lichess_widget lichess_long\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />Lichess<br /><br />"
	tmp    += "<span>One: two<br />Three: four</span></a>";
	document.write(tmp);
	$.ajax({
		url: "http://en.lichess.org/api/user/" + author,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			$("#lichess_widget_" + id + " > span").text(author + "<br />Classical: " + data.perfs.classical.rating + "<br />Bullet: " + data.perfs.bullet.rating);
		}
	});
};
