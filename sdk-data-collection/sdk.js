var appid = '1241132132';
var vn = 'name';
var vc = '1.0.1';
var TDRequestUrl = ' http://127.0.0.1:9000/app/v1';
var TDBaseUrl = 'src/sdk-core.js';

function createScriptTd(url) {
	var _head = document.getElementsByTagName('head')[0];
	var _script = document.createElement('script');
	_script.type = 'text/javascript';
	_script.src = url;
	_head.appendChild(_script)
};

// window["TDAPP"] = {};
// window["TDAPP"].onEvent = function(id, label, params) {
// 	if (arguments.length > 0) {
// 		try {
// 			var opts = {
// 				count: 1,
// 				start: new Date().getTime()
// 			};
// 			if (id != undefined) {
// 				opts["id"] = typeof id != "string" ? JSON.stringify(id) : id
// 			}
// 			if (label != undefined) {
// 				opts["label"] = typeof label != "string" ? JSON.stringify(label) : label
// 			} else {
// 				opts["label"] = ""
// 			}
// 			if (params != undefined) {
// 				var isJson = function(obj) {
// 					var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
// 					return isjson
// 				};
// 				if (isJson(params)) {
// 					opts["params"] = params
// 				} else {
// 					opts["params"] = {
// 						params: ""
// 					}
// 				}
// 			}
// 			var eventName = "__TD_td-init-event";
// 			var ev = localStorage[eventName];
// 			if (ev) {
// 				var ca = JSON.parse(ev);
// 				ca.push(opts);
// 				localStorage.setItem(eventName, JSON.stringify(ca));
// 				return
// 			};
// 			localStorage.setItem(eventName, "[" + JSON.stringify(opts) + "]")
// 		} catch (e) {}
// 	}
// };
