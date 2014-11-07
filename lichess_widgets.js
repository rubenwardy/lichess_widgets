String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

var lichess = {};
var serial = 0;

lichess.__make_online = function(id) {
	$(id).addClass("lichess_online");
	$(id + " > img").attr("src", "http://rubenwardy.github.io/lichess_widgets/lichess_online.png");
}

lichess.profile = function(theme, author, text) {
	serial++;
	var id = serial;
	if (text == null)
		text = author;
	var tmp = "<a  id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme + "\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
	tmp    += "<span>" + text + "</span></a>";
	document.write(tmp);
	$.ajax({
		url: "http://en.lichess.org/api/user/" + author,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			if (data.online)
				lichess.__make_online("#lichess_widget_" + id);
		}
	});
};
lichess.profile_scores = function(theme, author, text) {
	serial++;
	var id = serial;
	if (text == undefined)
		text = author;
	var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme + "\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
	tmp    += "<span>Loading...</span></a>";
	document.write(tmp);
	$.ajax({
		url: "http://en.lichess.org/api/user/" + author,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			if (data.online)
				lichess.__make_online("#lichess_widget_" + id);

			if (text && text != "")
				text = text + " | ";
			$("#lichess_widget_" + id + " > span").html(text + "Classical <b>" + data.perfs.classical.rating + "</b> | Bullet <b>" + data.perfs.bullet.rating + "</b>");
		}
	});
};
lichess.profile_big = function(theme, author, text) {
	serial++;
	var id = serial;
	if (text == undefined)
		text = author + " on Lichess";
	var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme + " lichess_long\" href=\"http://lichess.org/@/" + author + "\">";
	tmp    += "<img src=\"http://en.lichess.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />" + text + "<hr />"
	tmp    += "<span>One: two<br />Three: four</span></a>";
	document.write(tmp);
	$.ajax({
		url: "http://en.lichess.org/api/user/" + author,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			if (data.online)
				lichess.__make_online("#lichess_widget_" + id);

			var res = "";
			for (var key in data.perfs) {
				if (data.perfs.hasOwnProperty(key) && data.perfs[key].games > 0) {
					if (res!="")
						res += "<br />";
					res += key.capitalize() + " <b>" + data.perfs[key].rating + "</b> / " + data.perfs[key].games + " Games";
				}
			}
			$("#lichess_widget_" + id + " > span").html(res);
		}
	});
};
