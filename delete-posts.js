/**
 * 
 * URL: https://www.linkedin.com/in/{username}/detail/recent-activity/shares
 * Execute this script in the browser developer console by pressing F12 and selecting the Console tab.
 * 
 * Description: This code is designed to automate the process of deleting user activity/posts on a LinkedIn page. It goes through the following steps:
 * First, it retrieves all the post edit menu buttons currently visible on the page.
 * It iterates through the edit menu buttons, clicks on each button to open the post edit menu, and waits for the menu to appear.
 * After the menu appears, it searches for the delete post option in the menu and clicks on it.
 * It then waits for the post deletion confirmation modal to appear, clicks on the confirm delete button, and waits for the modal to disappear.
 * After processing all visible posts, it scrolls to the bottom of the page to load more activity/posts.
 * If there are more post edit menu buttons available after loading more activity, the process is repeated from step 2.
 * 
 * The script continues to loop through these steps until there are no more posts to delete or an error occurs.
 * 
 */

/**
 * Sleep for a specified number of seconds.
 * @param {number} seconds - The number of seconds to sleep.
 * @returns {Promise} A Promise that resolves after the specified number of seconds.
 */
function sleep(seconds) {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Creates a timeout Promise that rejects after a specified time limit.
 * @param {number} timeLimit - The number of seconds before the timeout is triggered.
 * @param {string} [msg='Async call timeout limit reached'] - The error message when the timeout is reached.
 * @returns {Promise} A Promise that rejects with an error after the specified time limit.
 */
function timeout(timeLimit, msg = 'Async call timeout limit reached') {
	return new Promise((_resolve, reject) => {
		timeoutHandle = setTimeout(
			() => reject(new Error(msg)),
			timeLimit * 1000
		);
	});
}

/**
 * Waits for an element matching the selector to appear in the DOM.
 * @param {string} selector - The CSS selector to find the element.
 * @param {HTMLElement} [parent=document] - The parent element to start the query from.
 * @returns {Promise<HTMLElement>} A Promise that resolves with the found element.
 * @throws Will reject the Promise if the element is not found.
 */
async function awaitThis(selector, parent = document) {
	let element = parent.querySelector(selector);
	if (element) return Promise.resolve(element);
	while (null == element) {
		await sleep(1);
		element = parent.querySelector(selector);
		if (element) return Promise.resolve(element);
	}
	return Promise.reject(null);
};

/**
 * Waits for the specified element to be removed from the DOM.
 * @param {HTMLElement} element - The element to wait for its removal.
 * @returns {Promise<string>} A Promise that resolves with a message indicating the element is gone.
 * @throws Will reject the Promise if the element remains in the DOM.
 */
async function awaitGone(element) {
	if (null == element) return Promise.resolve("element is gone");
	while (document.contains(element)) {
		await sleep(1);
		if (true != document.contains(element)) return Promise.resolve("element is gone");
	}
	return Promise.reject(null);
}

/**
 * Waits for the specified element to be removed from the DOM or the specified time limit, whichever comes first.
 * @param {HTMLElement} element - The element to wait for its removal.
 * @param {number} [seconds=60] - The number of seconds before the timeout is triggered.
 * @returns {Promise} A Promise that resolves with a message indicating the element is gone or rejects with a timeout error.
 */
function awaitGoneTimed(element, seconds = 60) {
	return Promise.race([awaitGone(element), timeout(seconds)]);
}

/**
 * Waits for an element matching the selector to appear in the DOM or the specified time limit, whichever comes first.
 * @param {string} selector - The CSS selector to find the element.
 * @param {HTMLElement} [parent=document] - The parent element to start the query from.
 * @param {number} [seconds=60] - The number of seconds before the timeout is triggered.
 * @returns {Promise<HTMLElement>} A Promise that resolves with the found element or rejects with a timeout error.
 */
function awaitThisTimed(selector, parent = document, seconds = 60) {
	return Promise.race([awaitThis(selector, parent), timeout(seconds)]);
}

/**
 * Retrieves all the post edit menu buttons on the page.
 * @returns {Array<HTMLElement>} An array of HTMLElements representing the post edit menu buttons.
 */
function getPostEditMenuButtons() {
	var buttons = [];
	for (const x of document.querySelectorAll(".feed-shared-control-menu__trigger")) {
		buttons.push(x);
	}
	return buttons;
}
// Forces scroll down
/**
 * Scrolls to the bottom of the page to load more activity/posts.
 * @returns {Promise<void>} A Promise that resolves after scrolling to the bottom.
 */
async function loadMoreActivity() {
	window.scrollTo(0, document.body.scrollHeight);
}

/**
 * The main function for the script. Initializes and runs the process of finding, deleting,
 * and loading more posts.
 * @returns {Promise<boolean>} A Promise that resolves to true when the process is complete.
 **/
async function init() {
	try {
		console.log("** Starting activity deletion ***");

		// Grab first set of post-edit buttons [...]
		const editMenuButtons = getPostEditMenuButtons();
		if (0 == editMenuButtons.length) {
			console.log("No posts found!");
			const scrollHeight = document.body.scrollHeight;
			await loadMoreActivity();
			// check if there are no more post edit menu buttons after loading more activity
			const newEditMenuButtons = getPostEditMenuButtons();
			if (0 == newEditMenuButtons.length && document.body.scrollHeight == scrollHeight) {
				console.log("No more posts left to delete.");
				return true;
			}
			console.log(">>> Loaded more activity.");
			await sleep(3);
			init();
		}

		console.log(">>> Deleting loaded activity");
		for (const emButton of editMenuButtons) {
			emButton.scrollIntoView();
			emButton.click();
			const menu = await awaitThisTimed(".feed-shared-control-menu__content");

			if (true !== menu instanceof HTMLElement) {
				throw "Menu not found!";
			} else {
				console.log(`Menu found (id:${menu.id})`);
			}

			const deleteButton = await awaitThisTimed(".option-delete .feed-shared-control-menu__headline", menu);

			if (true !== deleteButton instanceof HTMLElement) {
				throw `Though menu (id:${menu.id}) was found, post-delete button was not!`;
			} else {
				console.log("delete button in menu found");
			}

			deleteButton.click();

			const modalAcceptButton = await awaitThisTimed("button.feed-components-shared-decision-modal__confirm-button.artdeco-button.artdeco-button--primary.artdeco-button--2");
			console.log(modalAcceptButton);
			if (true !== modalAcceptButton instanceof HTMLElement) {
				throw "Post deletion modal not found!";
			} else {
				console.log("modal accept button found");
			}

			modalAcceptButton.click();
			const result = await awaitGoneTimed(modalAcceptButton);
			console.log(result);
			if (null == result) {
				throw "IDK";
			}
		}

		console.log(">>> Loading more activity");
		await loadMoreActivity();
		console.log(">>> Done.");
		await sleep(3);
		init();
	} catch (error) {
		console.error("Error:", error.message);
	}

	return true;
}

init();
