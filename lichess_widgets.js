var lichess = (function() {
	function make_online(id) {
		$(id).addClass("lichess_online");
		$(id + " > img").attr("src", "http://rubenwardy.github.io/lichess_widgets/lichess_online.png");
	}
	function capitalize(inp) {
		return inp.charAt(0).toUpperCase() + inp.slice(1);
	}
	var serial = 0;
	return {
		profile: function(theme, author, text) {
			serial++;
			var id = serial;
			if (text == null)
				text = author;
			var tmp = "<a  id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme;
			tmp    += "\" href=\"http://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"http://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
			tmp    += "<span>" + text + "</span></a>";
			document.write(tmp);
			$.ajax({
				url: "http://en.lichess.org/api/user/" + author,
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data) {
					if (data.online)
						make_online("#lichess_widget_" + id);
				}
			});
		},
		profile_scores: function(theme, author, text) {
			serial++;
			var id = serial;
			if (text == undefined)
				text = author;
			var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme;
			tmp    += "\" href=\"http://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"http://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
			tmp    += "<span>" + text + "</span></a>";
			document.write(tmp);
			$.ajax({
				url: "http://en.lichess.org/api/user/" + author,
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data) {
					if (data.online)
						make_online("#lichess_widget_" + id);

					if (text && text != "")
						text = text + " | ";
					$("#lichess_widget_" + id + " > span").html(text + "Classical <b>" + data.perfs.classical.rating + "</b> | Bullet <b>" + data.perfs.bullet.rating + "</b>");
				}
			});
		},
		profile_big: function(theme, author, text) {
			serial++;
			var id = serial;
			if (text == undefined)
				text = author + " on Lichess";
			var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme + " lichess_long\" href=\"http://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"http://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />" + text + "<hr />"
			tmp    += "<span></span></a>";
			document.write(tmp);
			$.ajax({
				url: "http://en.lichess.org/api/user/" + author,
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data) {
					if (data.online)
						make_online("#lichess_widget_" + id);

					var res = "";
					for (var key in data.perfs) {
						if (data.perfs.hasOwnProperty(key) && data.perfs[key].games > 0) {
							if (res!="")
								res += "<br />";
							res += capitalize(key) + " <b>" + data.perfs[key].rating + "</b> / " + data.perfs[key].games + " Games";
						}
					}
					$("#lichess_widget_" + id + " > span").html(res);
				}
			});
		}
	}
})();
