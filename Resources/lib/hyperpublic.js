function Client(clientKey, clientSecret) {
	data.CLIENT_ID = clientKey;
	data.CLIENT_SECRET = clientSecret;
	data.ENDPOINT = 'https://api.hyperpublic.com/api/v1/';
};

Client.prototype.places = {
	find : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "places",
			"params" : params,
		}
		APICall(args, callback);
	},
	show : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "places",
			"params" : params,
		}
		APICall(args, callback);
	},
	create : function(params, callback) {
		var args = {
			"method" : "POST",
			"call" : "places",
			"params" : params,
		}
		APICall(args, callback);
	}
}

Client.prototype.offers = {
	find : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "offers",
			"params" : params,
		}
		APICall(args, callback);
	},
	show : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "offers",
			"params" : params,
		}
		APICall(args, callback);
	}
};

Client.prototype.categories = {
	list : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "categories",
			"params" : params,
		}
		APICall(args, callback);
	},
	show : function(params, callback) {
		var args = {
			"method" : "GET",
			"call" : "categories",
			"params" : params,
		}
		APICall(args, callback);
	}
};

var APICall = function(args, callback) {
	var xhr = Ti.Network.createHTTPClient();

	args.params.client_id = data.CLIENT_ID;
	args.params.client_secret = data.CLIENT_SECRET;

	xhr.onerror = function(r) {
		Titanium.API.error("APICall error: " + xhr.responseText);
		callback({
			"success" : false,
			"response" : xhr.responseText,
			"error" : r,
		});
		xhr.abort();
		xhr = null;
	};

	xhr.onload = function() {
		Titanium.API.debug("APICall success: " + xhr.responseText);
		callback({
			"success" : true,
			"response" : xhr.responseText
		});
		xhr.abort();
		xhr = null;
	};
	
	if(args.method == 'PUT' || args.method == 'POST') {
		xhr.open(args.method, data.ENDPOINT + args.call);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(args.params);
	} else {
		var url = data.ENDPOINT + args.call + "?";
		var paramMap = args.params || {};
		for(var a in paramMap) {
			url += Titanium.Network.encodeURIComponent(a) + '=' + Titanium.Network.encodeURIComponent(paramMap[a]) + '&';
		}
		xhr.open(args.method, url);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send();
	}
};

data = {};
exports.Client = Client;
