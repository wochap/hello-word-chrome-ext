chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      // ----------------------------------------------------------
      var encodedHtml = encodeURIComponent(document.body.innerHTML);
      window.$.ajax({
        type: "POST",
        url: "https://sleepy-bhaskara-dd4a2f.netlify.com/.netlify/functions/hello-world",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify({
          html: encodedHtml,
        }),
        error: function (error) {
          console.error(error)
        },
        success: function (data) {
          var answers = data.data;
          var flag = false;

          // alt + g
          $(document).on("keyup", function (e) {
            if (e.altKey && e.which == 71) {
              flag = !flag
            }
          });
          window.$("form .card-box").each(function (index, questionBox) {
            var $correctAnswer = window.$(questionBox).find("input[value='" + answers[index] + "']");
            var $label = $correctAnswer.parent().find("label")
            var labelText = $label.html().trim();
            var customLabel = labelText.slice(0, labelText.length - 1);

            $label.on("mouseenter", function () {
              if (flag) {
                $label.html(customLabel);
              } else {
                $label.html(labelText);
              }
            })
            $label.on("mouseleave", function () {
              $label.html(labelText);
            })
          })
        },
      });
    }
  }, 10);
});
