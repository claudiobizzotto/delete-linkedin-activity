// https://www.linkedin.com/in/{username}/detail/recent-activity

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets like buttons on posts you've thumbed up.
function getLikesOnPosts() {
    return document.querySelectorAll(".react-button__trigger.artdeco-button[aria-pressed=\"true\"]");
}

// Gets like buttons on comments you've thumbed up.
function getLikesOnComments() {
    return document.querySelectorAll(".comments-comment-social-bar__like-action-button[aria-pressed=\"true\"]");
}

//
function getDeleteCommentButtons() {
    var buttons = [];
    for (const span of document.querySelectorAll("span.mh4.comments-options-menu__text")) {
        if (span.textContent.includes("Delete")) {
            buttons.push(span);
        }
    }

    return buttons;
}

// Forces click on "load more comments" buttons.
function loadMoreComments() {
    var loadMoreCommentsButtons = document.querySelectorAll(".button.comments-comments-list__show-previous-button");
    for (var i = 0; i < loadMoreCommentsButtons.length; i++) {
        loadMoreCommentsButtons[i].click();
    }
}

// Forces click on "load previous replies" buttons.
function loadPreviousReplies() {
    var loadPreviousRepliesButtons = document.querySelectorAll("button.show-prev-replies");
    for (var i = 0; i < loadPreviousRepliesButtons.length; i++) {
        loadPreviousRepliesButtons[i].click();
    }
}

// Forces scroll down and loads more comments and previous replies
function loadMoreActivity() {
    window.scrollTo(0, document.body.scrollHeight);
    loadMoreComments();
    loadPreviousReplies();
}

//
function deleteActivity() {
    var i;

    var likesOnPosts = getLikesOnPosts();
    for (i = 0; i < likesOnPosts.length; i++) {
        console.log(likesOnPosts[i].click());
    }

    var likesOnComments = getLikesOnComments();
    for (i = 0; i < likesOnComments.length; i++) {
        console.log(likesOnComments[i].click());
    }
}

//
var keepGoing = true;
async function init() {
    console.log("*** Starting activity deletion ***");
    console.log(">>> Loading more activity")
    loadMoreActivity();
    await sleep(2);
    console.log(">>> Deleting loaded activity")
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();
