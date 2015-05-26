/* nanoQuiz JSON Generator Core */
/* 1.1 by David */
var error = false;
$(document).ready(function() {
	$("fieldset, input").addClass("ui-corner-all");
	$(".generateBtn").button({ icons: { primary: "ui-icon-script" } });
	$(".addStamp").click(function(e) {
		e.preventDefault();
		$delete = $("<a href='#'>Delete</a>").click(function(e) {
			e.preventDefault();
			$(this).parent("fieldset").remove();
		});
		$(this).parent().parent().children(".timestamp").first().clone().insertBefore($(this).parent("div")).append($delete);
	});
	$(".addContent").click(function(e) {
		e.preventDefault();
		$delete = $("<a href='#'>Delete</a>").click(function(e) {
			e.preventDefault();
			$(this).parent("fieldset").remove();
		});
		$(".vignette").first().clone().insertBefore($(this).parent("div")).append($delete);
	});
	$(".addAnswer").click(function(e) {
		e.preventDefault();
		$delete = $("<a href='#'>Delete</a>").click(function(e) {
			e.preventDefault();
			$(this).parent("fieldset").children(".answerType").val("text").trigger("change");
			$(this).parent("fieldset").remove();
		});
		$(".answer").first().clone(true).insertBefore($(this).parent("div")).append($delete);
	});
	var hasSprite = false;
	$(".answerType").change(function(e) {
		hasSprite = false;
		$(".answerType").each(function(index, element) {
			if ($(this).val() == "sprite") {
				hasSprite = true;
				return;
			}
		});
		if (hasSprite)
			$(".sprite").show();
		else
			$(".sprite").hide();
	});
	$(".generateBtn").click(function(e) {
		e.preventDefault();
		$(".errorMsg").remove();
		error = false;
		var question = {};
		if ($(".id").val().length == 0)
			ErrorMessage("error", "Question ID required", $(".id"));
		question["id"] = $(".id").val();
		/* Timestamp */
		var stamp = new Array();
		$(".lectureStamp").each(function(index, element) {
			if ($(element).children(".stamp").val().length > 0)
				stamp.push(parseInt($(element).children(".stamp").val()));
		});
		if (stamp.length > 0)
			question["lecture"] = stamp;
		else
			ErrorMessage("warning", "No lecture #.", $(".lectureStamp"));
		var stamp = new Array();
		$(".unitStamp").each(function(index, element) {
			if ($(element).children(".stamp").val().length > 0)
				stamp.push(parseInt($(element).children(".stamp").val()));
		});
		if (stamp.length > 0)
			question["unit"] = stamp;
		else
			ErrorMessage("warning", "No unit #.", $(".unitStamp"));
		var stamp = new Array();
		$(".weekStamp").each(function(index, element) {
			if ($(element).children(".stamp").val().length > 0)
				stamp.push(parseInt($(element).children(".stamp").val()));
		});
		if (stamp.length > 0)
			question["week"] = stamp;
		else
			ErrorMessage("warning", "No week #.", $(".weekStamp"));
		var stamp = new Array();
		$(".testStamp").each(function(index, element) {
			if ($(element).children(".stamp").val().length > 0)
				stamp.push(parseInt($(element).children(".stamp").val()));
		});
		if (stamp.length > 0)
			question["test"] = stamp;
		else
			ErrorMessage("warning", "No test #.", $(".testStamp"));
		/* End of Timestamp */
		var vignette = new Array();
		$(".vignette").each(function(index, element) {
			var content = {};
			content["type"] = $(element).children(".contentType").val();
			content["content"] = $(element).children(".contentValue").val();
			if ($(element).children(".contentValue").val().length > 0)
				vignette.push(content);
			else
				ErrorMessage("warning", "Blank entry will not be included", $(element).children(".contentValue"));
		});
		if (vignette.length == 0)
			ErrorMessage("error", "Question has no content", $(".addContent").parent("div"));
		question["vignette"] = vignette;
		if (hasSprite) {
			if ($(".spriteValue").val().length == 0)
				ErrorMessage("error", "Sprite required", $(".spriteValue"));
			question["sprite"] = {"content": $(".spriteValue").val()};
		}
		var answer = new Array();
		if ($(".answer .correct:checked").length < 1) {
			ErrorMessage("error", "No correct answer", $(".answer .correct"));
		}
		else if($(".answer .correct:checked").length > 1)
			ErrorMessage("warning", "More than 1 correct answers", $(".answer .correct:checked"));
		$(".answer").each(function(index, element) {
			var content = {};
			content["type"] = $(element).children(".answerType").val();
			content["correct"] = $(element).children(".correct").is(":checked") ? "true": "false";
			content["content"] = $(element).children(".answerValue").val();
			if ($(element).children(".answerValue").val().length > 0)
				answer.push(content);
			else
				ErrorMessage("warning", "Blank entry will not be included", $(element).children(".answerValue"));
		});
		if (answer.length == 0)
			ErrorMessage("error", "Question should have at least 2 choices", $(".addAnswer").parent("div"));
		question["answer"] = answer;
		if (error) {
			$(".output pre code").html("Error occured");
		}
		else {
			$(".output pre code").html(JSON.stringify(question, null, 2));
		}
		hljs.highlightBlock($(".output pre code").get(0));
	});
});

function ErrorMessage(type, msg, $target) {
	if (type == "error") {
		error = true;
		$("<div></div>").insertAfter($target).addClass("errorMsg ui-state-error ui-corner-all ui-button ui-button-text-icon-primary").html(type + ": " + msg).append("<span class='ui-button-icon-primary ui-icon ui-icon-alert' style='margin-right: .3em;'></span>");
	}
	else
		$("<div></div>").insertAfter($target).addClass("errorMsg ui-state-highlight ui-corner-all ui-button ui-button-text-icon-primary").html(type + ": " + msg).append("<span class='ui-button-icon-primary ui-icon ui-icon-info' style='margin-right: .3em;'></span>");
}