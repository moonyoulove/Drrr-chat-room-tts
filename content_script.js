var debug_switch = 0;
var tts_player;
var tts_text = [];
var regex = /(^.+(?=\n))|[\u003f\uff1f\u0021\uff01\u003a\u003b\u0027\u0022\u0040\u0028\u005b\u007b\u005e\u300c\u300d\u0028\u005b\u007d]/g;
createDOM();
onDomUpdate();
tts_player.onended = (function() {
	tts_text.shift();
	if (tts_player.ended && tts_text != "") textToSpeech();
});
console.log("啟動朗讀");

function onDomUpdate() {
	new MutationObserver(function(records) {
		records.map(function(record) {
			tts_text.push(record.addedNodes[0].innerText.replace(regex, replaceAction));
			if (tts_text.length === 1) textToSpeech();
			if (debug_switch) debugFunc(record);
		});
	}).observe(document.getElementById("talks"), {
		"childList": true
	});
}

function createDOM() {
	tts_player = document.body.appendChild(document.createElement("audio"));
	document.body.appendChild(document.createElement("div")).style.cssText = "border-top: 10px solid transparent;border-left: 15px solid;border-bottom: 10px solid transparent;position: fixed;bottom: 10px;right: 15px;z-index: 2147483647;";
}

function textToSpeech() {
	tts_player.src = "https://google-translate-proxy.herokuapp.com/api/tts?query=" + tts_text[0] + "&language=zh-TW";
	tts_player.play();
}

function debugFunc(record) {
	window.r = record;
	console.log(tts_text.slice(-1));
}

function replaceAction(m, p1) {
	switch (m) {
		case p1:
			return m + "說";
		case "?":
			return "問號";
		case "？":
			return "問號";
		case "!":
			return "驚嘆號";
		case "！":
			return "驚嘆號";
		case ":":
			return "冒號";
		case ";":
			return "分號";
		case "'":
			return "單引號";
		case "\"":
			return "雙引號";
		case "@":
			return "艾特";
		case "(":
			return "左括號";
		case "[":
			return "方括號";
		case "{":
			return "花括號";
		case "^":
			return "抑揚號";
		case "「":
			return "上括號";
		case "」":
			return "下括號";
		case ")":
			return "右括號";
		case "]":
			return "方括號";
		case "}":
			return "花括號";
		default:
			return m;
	}
}
