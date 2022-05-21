/*

Replacer: https://github.com/juyoung101/replacer

Bionic Reading: https://github.com/juyoung101/bionic-reading

Test Page: https://en.wikipedia.org/wiki/Minecraft

The "White Paper": https://bionic-reading.com/

*/



// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", async ({ color }) => {
    
	
	// Original Method, slow and clunky, waits until entire page is finished and stalls the UI thread
	/*
	let pList;
    let option1 = document.getElementsByTagName("p");
    let option2 = document.getElementsByTagName("font");
    if (option1.length > option2.length) {
      pList = option1;
    } else {
      pList = option2;
    }
    for (let sentence of pList) {
      const sentenceText = sentence.innerText;

      const textArr = sentenceText.split(" ");
      const textArrTransformed = textArr.map((word) => {
        const length = word.length;
        const midPoint = Math.round(length / 2);
        const firstHalf = word.slice(0, midPoint);
        const secondHalf = word.slice(midPoint);
        const htmlWord = `${firstHalf}${secondHalf}`;
        return htmlWord;
      });
      console.log();
      sentence.innerHTML = textArrTransformed.join(" ");
    }
	*/
	
	//process spans first since this method adds more span elements
    let spanElements = document.getElementsByTagName("span");
	pElements.forEach(function(textElement) {
		asynchronousProcess(function(textElement) {
			for (var j = 0; j < textElement.childNodes.length; j++) {
				var node = textElement.childNodes[j];
				if (node.nodeType === 3) {
					var text = node.nodeValue;
					var txt = document.createElement("span");
					//TODO handle words, temporarily it is using the whole text
					const length = text.length;
					const midPoint = Math.round(length / 2);
					const firstHalf = text.slice(0, midPoint);
					const secondHalf = text.slice(midPoint);
					const htmlWord = `${firstHalf}${secondHalf}`;
					txt.innerHTML = htmlWord;
					node.replaceWith(txt);
					
					//alternate node replace method
					//var replacedText = "text;
					//if (replacedText !== text) {
					//	textElement.replaceChild(document.createTextNode(replacedText), node);
					//}
				}
			}
		});
	});	
	
	// then we can process other tag types
    let pElements = document.getElementsByTagName("p");
	spanElements.forEach(function(item, i) {
		asynchronousProcess(function(item) {
			console.log(i);
		});
	});

    // document.body.style.backgroundColor = color;
  });
}
