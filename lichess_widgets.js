var lichess_widgets = (function() {
	var callback_serials = 0;
	function fetchJson(url, callback) {
		callback_serials++;
		var script = document.createElement('script');
		lichess_widgets.callbacks["cb" + callback_serials] = callback;
		script.src = url + "?callback=lichess_widgets.callbacks.cb" + callback_serials;
		document.body.appendChild(script);
	}

	function make_online(id) {
		var ele = document.getElementById(id);
		ele.className = ele.className + " lichess_online";
		ele.getElementsByTagName('img')[0].src = "https://rubenwardy.com/lichess_widgets/lichess_online.png";
	}

	function capitalize(inp) {
		return inp.charAt(0).toUpperCase() + inp.slice(1);
	}

	var serial = 0;
	return {
		callbacks: {},
		profile: function(theme, author, text) {
			serial++;
			var id = serial;
			if (text == null)
				text = author;
			var tmp = "<a  id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme;
			tmp    += "\" href=\"https://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"https://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
			tmp    += "<span>" + text + "</span></a>";
			document.write(tmp);
			fetchJson("https://en.lichess.org/api/user/" + author,function(data) {
				if (data.online)
					make_online("lichess_widget_" + id);
			});
		},
		profile_scores: function(theme, author, text) {
			serial++;
			var id = serial;
			if (text == undefined)
				text = author;
			var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme;
			tmp    += "\" href=\"https://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"https://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />"
			tmp    += "<span>" + text + "</span></a>";
			document.write(tmp);
			fetchJson("https://en.lichess.org/api/user/" + author, function(data) {
				if (data.online)
					make_online("lichess_widget_" + id);

				if (text && text != "")
					text = text + " | ";

				var res = text + "Classical <b>" + data.perfs.classical.rating;
				res    += "</b> | Bullet <b>" + data.perfs.bullet.rating + "</b>";

				document.getElementById("lichess_widget_" + id).getElementsByTagName('span')[0].innerHTML = res;
			});
		},
		profile_big: function(theme, author, text, minGames) {
			serial++;
			var id = serial;
			if (text == undefined)
				text = author + " on Lichess";
			if (minGames == undefined)
				minGames = 1;
			var tmp = "<a id=\"lichess_widget_" + id + "\" class=\"lichess_widget lichess_theme_" + theme;
			tmp    += " lichess_long\" href=\"https://lichess.org/@/" + author + "\">";
			tmp    += "<img src=\"https://lichess1.org/assets/images/favicon-32-white.png\" alt=\"lichess\" />" + text + "<hr />"
			tmp    += "<span></span></a>";
			document.write(tmp);
			fetchJson("https://en.lichess.org/api/user/" + author, function(data) {
				if (data.online)
					make_online("lichess_widget_" + id);

				var res = "";
				for (var key in data.perfs) {
					if (data.perfs.hasOwnProperty(key) && data.perfs[key].games >= minGames) {
						if (res!="")
							res += "<br />";
						res += capitalize(key) + " <b>" + data.perfs[key].rating + "</b> / " + data.perfs[key].games + " Games";
					}
				}
				document.getElementById("lichess_widget_" + id).getElementsByTagName('span')[0].innerHTML = res;
			});
		}
	}
})();
