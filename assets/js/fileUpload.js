$(document).ready(function(){
    $("input#imageFile").change(function () {
        if ($("input#imageFile").val() == "") {
            return;
        }
        // your ajax submit
        $("label#fileNameLabel").text($('input#imageFile')[0].files[0].name);
    });
});

$(document).ready(function(){
    $("input#forum-text-input").click(function () {
        var topic_type = $("input[name='forum-input-val']").val();
        window.location.href = `/forums/post_forum?topic_type=${topic_type}`
    });
});

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var queryString = urlParams.get('topic_type');
    $("#forum-topic-select > option").each(function() {
      if (this.value == queryString) {
        this.selected = 'selected';
      }
    });
  });

$(document).ready(function(){
    $("div.forum-thread-post").click(function () {
        if(event.target.className != "material-icons" && event.target != "javascript:{}") {
            var topic_id = $(this).attr("data-id");
            var topic_type = $(this).attr("data-type");
            window.location.href = `/forums/${topic_type}/${topic_id}`
        }
    });
});