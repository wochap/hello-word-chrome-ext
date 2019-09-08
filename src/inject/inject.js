chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
    var encodedHtml = encodeURIComponent(document.body.innerHTML);
    window.$.ajax({
      type: "POST",
      url: "https://sleepy-bhaskara-dd4a2f.netlify.com/.netlify/functions/hello-world",
      data: JSON.stringify({
        html: encodedHtml,
      }),
      success: function (data) {
        window.$("form .card-box").each(function (index, el) {
          const answers = data.data;
          const $correctAnswer = window.$(el).find("input[value='" + answers[index] + "']");
          const $label = $correctAnswer.parent().find("label")
          const labelText = $label.html().trim();
          const lastDigit = labelText.slice(labelText.length - 1);
          // const customLabel = labelText.slice(0, labelText.length - 1) + "<span style='font-style: italic; color: #424242;'>" + lastDigit + "</span>";
          const customLabel = labelText.slice(0, labelText.length - 1);
          $label.on("mouseenter", function() {
              $label.html(customLabel);
              // const $span = $label.find("span");
              // $span.css("font-style", "italic");
              // $span.css("color", "#424242");
          })
          $label.on("mouseleave", function() {
              $label.html(labelText);
              // $span.css("font-style", null);
              // $span.css("font-style", null);
          })
        })
      },
      contentType: 'application/json',
      dataType: "json"
    });
	}
	}, 10);
});