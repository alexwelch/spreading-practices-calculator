document.addEventListener("DOMContentLoaded", function(event) {
  document.calculateForm.onsubmit = function() {
    var iterations = calculate();

    var html = "";
    for (i = 0; i < iterations.length; i++) {
      var item = iterations[i];
      html += "<tr><td>" + i + "</td><td>" + item.accumulatedTime + "</td><td>" + item.enabledPeople + "</td><td>" + item.failedEnablments + "</td><td>" + item.totalAttempts + "</td><td>" + item.percentSuccess + "%</td></tr>";
    }
    document.getElementById("output").innerHTML = html;
    return false;
  };

  function calculate() {
    var successRate = parseFloat(document.getElementById("success_rate").value / 100),
        rampTime = parseFloat(document.getElementById("ramp_time").value),
        enabledPeople = parseFloat(document.getElementById("enabled_people").value),
        desiredEnabledPeople = parseFloat(document.getElementById("desired_enabled_people").value),
        failedEnablments = 0,
        totalTimeSpent = 0,
        iterations = [
          buildIteration(
            totalTimeSpent,
            enabledPeople,
            failedEnablments
          )
        ];

    while ( enabledPeople < desiredEnabledPeople ) {
      totalTimeSpent += parseFloat(rampTime);
      failedEnablments += enabledPeople * (1 - successRate)
      enabledPeople = enabledPeople * (1 + successRate)


      iterations.push(
        buildIteration(
          totalTimeSpent,
          enabledPeople,
          failedEnablments
        )
      );
    }

    return iterations;
  }

  function buildIteration(totalTimeSpent, enabledPeople, failedEnablments) {
      var totalAttempts = enabledPeople + failedEnablments,
          percentSuccess = (enabledPeople / totalAttempts * 100).toFixed(0);

    return {
      accumulatedTime: totalTimeSpent,
      enabledPeople: enabledPeople.toFixed(0),
      failedEnablments: failedEnablments.toFixed(0),
      totalAttempts: totalAttempts.toFixed(0),
      percentSuccess: percentSuccess
    };
  }
});
