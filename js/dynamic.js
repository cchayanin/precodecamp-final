function toggleEditName() {
  var editName = $("#editName")[0];
  var editNameIcon = $("#editNameIcon")[0];

  if (!editName.style.display || editName.style.display === "none") {
    editName.style.display = "inline-block";
    editNameIcon.style.display = "none";
  } else {
    editName.style.display = "none";
    editNameIcon.style.display = "inline-block";
  }
}

//change name
function submitName() {
  var name = $("#inputEditName").val();
  // set new name
  $("#nameText").text(name);
  // clear input text value
  $("#inputEditName").val("");
  // toggle to hide input text and show edit icon
  editName.style.display = "none";
  editNameIcon.style.display = "inline-block";
}

function toggleEditSkill() {
  var editSkillIcon = $("#editSkillIcon")[0];
  var closeSkillIcon = $("#closeSkillIcon")[0];
  var inputSkill = $("#skill-list > span")[0];

  if (
    !closeSkillIcon.style.display ||
    closeSkillIcon.style.display === "none"
  ) {
    editSkillIcon.style.display = "none";
    closeSkillIcon.style.display = "inline-block";
    inputSkill.style.display = "inline-block";
    $("#skill-list > li > span").each(function() {
      $(this).css({ display: "inline-block" });
    });
  } else {
    editSkillIcon.style.display = "inline-block";
    closeSkillIcon.style.display = "none";
    inputSkill.style.display = "none";
    $("#skill-list > li > span:first-child").each(function() {
      $(this).css({ display: "none" });
    });
  }
}

//add list skill
function submitSkill() {
  var skill = $("#inputEditSkill").val();
  var $targetElement = $("#skill-list > span");
  $targetElement.before(
    $("<li/>")
      .append(
        $("<span/>", { class: "delIcon" }).append(
          $("<i/>", { class: "far fa-trash-alt" })
        )
      )
      .append($("<span/>", { text: skill }))
  );

  //refresh delIcon
  $("#skill-list > li > span").each(function() {
    $(this).css({ display: "inline-block" });
  });
  $("#inputEditSkill").val("");
}

// remove list skill
$(document).on("click", ".delIcon", function() {
  $(this)
    .closest("li")
    .toggleClass("strike")
    .fadeOut("slow", function() {
      $(this).remove();
    });
});

function changeBackgroudColor() {
  var backgroundColor = $("#pickColor input").val();
  var h = hexToHSL(backgroundColor);
  var hsl = "hsl(" + h[0] + "," + h[1] + "%," + h[2] + "%)";
  var font = "hsl(" + checkDegree(h[0] + 180) + "," + h[1] + "%," + h[2] + "%)";
  var icon = "hsl(" + checkDegree(h[0] + 50) + "," + h[1] + "%," + h[2] + "%)";
  var border =
    "hsl(" + checkDegree(h[0] + 230) + "," + h[1] + "%," + h[2] + "%)";

  $("html")
    .get(0)
    .style.setProperty("--backgroundColor", hsl);
  $("html")
    .get(0)
    .style.setProperty("--fontColor", font);
  $("html")
    .get(0)
    .style.setProperty("--iconColor", icon);
  $("html")
    .get(0)
    .style.setProperty("--borderColor", border);
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
  // return "hsl(" + h + "," + s + "%," + l + "%)";
}

function checkDegree(degree) {
  var result;
  if (degree >= 360) {
    result = Math.abs(degree - 360);
  } else {
    return (result = degree);
  }
  return result;
}
