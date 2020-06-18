$(document).ready(function () {
    $("input#imageFile").change(function () {
        if ($("input#imageFile").val() == "") {
            return;
        }
        // your ajax submit
        $("label#fileNameLabel").text($('input#imageFile')[0].files[0].name);
    });
});

$(document).ready(function () {
    $("input#forum-text-input").click(function () {
        var topic_type = $("input[name='forum-input-val']").val();
        window.location.href = `/forums/post_forum?topic_type=${topic_type}`
    });
});

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    var queryString = urlParams.get('topic_type');
    $("#forum-topic-select > option").each(function () {
        if (this.value == queryString) {
            this.selected = 'selected';
        }
    });
});

$(document).ready(function () {
    $("div.forum-thread-post").click(function () {
        if (event.target.className != "material-icons" && event.target != "javascript:{}") {
            var topic_id = $(this).attr("data-id");
            var topic_type = $(this).attr("data-type");
            window.location.href = `/forums/${topic_type}/${topic_id}`
        }
    });
});

$(document).ready(function () {
    $("ul#page_1").css("display", "flex")
    $("ul#page_1").attr('data-shown', 'true');
    var numItems = $('ul.cards').length
    $("ul.pagination li button.blog-page-btn").click(function () {
        if ($(this).val() == "next") {
            var page_num = $('ul[data-shown="true"]').attr('id').split("_")[1];
            var new_page = parseInt(page_num) + 1;
            $('ul[data-shown="true"]').css("display", "none");
            $('ul[data-shown="true"]').attr("data-shown", "false");
            $(`ul#page_${new_page}`).attr("data-shown", "true");
            $(`ul#page_${new_page}`).css("display", "flex");
            $('button[value="prev"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (new_page === numItems) {
                $('button[value="next"]').addClass("disabled");
            }

        }
        else if ($(this).val() == "prev") {
            var page_num = $('ul[data-shown="true"]').attr('id').split("_")[1];
            var new_page = parseInt(page_num) - 1;
            $('ul[data-shown="true"]').css("display", "none");
            $('ul[data-shown="true"]').attr("data-shown", "false");
            $(`ul#page_${new_page}`).attr("data-shown", "true");
            $(`ul#page_${new_page}`).css("display", "flex");
            $('button[value="next"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (new_page === 1) {
                $('button[value="prev"]').addClass("disabled");
            }
        }
        else {
            var new_page = $(this).val();
            $('ul[data-shown="true"]').css("display", "none");
            $('ul[data-shown="true"]').attr("data-shown", "false");
            $(`ul#page_${new_page}`).attr("data-shown", "true");
            $(`ul#page_${new_page}`).css("display", "flex");
            $('button[value="next"]').removeClass("disabled");
            $('button[value="prev"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (parseInt(new_page) === 1) {
                $('button[value="prev"]').addClass("disabled");
            }
            if (parseInt(new_page) === numItems) {
                $('button[value="next"]').addClass("disabled");
            }
        }
    });

    $("div#page_1").css("display", "block")
    $("div#page_1").attr('data-shown', 'true');
    var numItems = $('div.forum-thread-container').length
    $("ul.pagination li button.forum-page-btn").click(function () {
        if ($(this).val() == "next") {
            var page_num = $('div[data-shown="true"]').attr('id').split("_")[1];
            var new_page = parseInt(page_num) + 1;
            $('div[data-shown="true"]').css("display", "none");
            $('div[data-shown="true"]').attr("data-shown", "false");
            $(`div#page_${new_page}`).attr("data-shown", "true");
            $(`div#page_${new_page}`).css("display", "block");
            $('button[value="prev"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (new_page === numItems) {
                $('button[value="next"]').addClass("disabled");
            }

        }
        else if ($(this).val() == "prev") {
            var page_num = $('ul[data-shown="true"]').attr('id').split("_")[1];
            var new_page = parseInt(page_num) - 1;
            $('div[data-shown="true"]').css("display", "none");
            $('div[data-shown="true"]').attr("data-shown", "false");
            $(`div#page_${new_page}`).attr("data-shown", "true");
            $(`div#page_${new_page}`).css("display", "block");
            $('button[value="next"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (new_page === 1) {
                $('button[value="prev"]').addClass("disabled");
            }
        }
        else {
            var new_page = $(this).val();
            $('div[data-shown="true"]').css("display", "none");
            $('div[data-shown="true"]').attr("data-shown", "false");
            $(`div#page_${new_page}`).attr("data-shown", "true");
            $(`div#page_${new_page}`).css("display", "block");
            $('button[value="next"]').removeClass("disabled");
            $('button[value="prev"]').removeClass("disabled");
            $('ul.pagination button.active').removeClass("disabled active");
            $(`ul.pagination button[value="${new_page}"]`).addClass("disabled active");
            if (parseInt(new_page) === 1) {
                $('button[value="prev"]').addClass("disabled");
            }
            if (parseInt(new_page) === numItems) {
                $('button[value="next"]').addClass("disabled");
            }
        }
    });
});

function showTextarea(id) {
    $(`#comment-${id}`).show();
}