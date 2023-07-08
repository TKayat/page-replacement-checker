function runFIFO() {
  const referenceString = document.getElementById("reference-string").value;
  const frameSize = parseInt(document.getElementById("frame-size").value, 10);
  const pages = referenceString.split(" ").map(Number);

  let frame = [];
  let pageFaults = 0;
  let pageHits = 0;

  let output = "";

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (frame.includes(page)) {
      pageHits++;
    } else {
      if (frame.length === frameSize) {
        frame.shift();
      }
      frame.push(page);
      pageFaults++;
    }

    output += `Page ${page}: Frame [${frame.join(
      ", "
    )}], Page Faults: ${pageFaults}, Page Hits: ${pageHits}\n`;
  }

  const outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = `
      <div class="algorithm-container">
          <h2>FIFO Algorithm</h2>
          <div class="result-box page-faults">
              <span>Page Faults:</span>
              <span>${pageFaults}</span>
          </div>
          <div class="result-box page-hits">
              <span>Page Hits:</span>
              <span>${pageHits}</span>
          </div>
          <div class="algorithm-info">
              <h3>About the Algorithm:</h3>
              <p>The FIFO (First In, First Out) algorithm replaces the oldest page in the frame when a page fault occurs.</p>
              <h3>Advantages:</h3>
              <ul>
                  <li>Easy to understand and implement</li>
                  <li>Does not require knowledge of future page references</li>
              </ul>
              <h3>Limitations:</h3>
              <ul>
                  <li>May result in high page fault rate for certain reference patterns (e.g., Belady's anomaly)</li>
              </ul>
          </div>
      </div>
      <div class="dynamic-working">
          <h3>Working:</h3>
          <pre>${output}</pre>
      </div>
  `;
}

function runLRU() {
  const referenceString = document.getElementById("reference-string").value;
  const frameSize = parseInt(document.getElementById("frame-size").value, 10);
  const pages = referenceString.split(" ").map(Number);

  let frame = [];
  let pageFaults = 0;
  let pageHits = 0;

  let output = "";

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const index = frame.indexOf(page);

    if (index !== -1) {
      frame.splice(index, 1);
      pageHits++;
    } else if (frame.length === frameSize) {
      frame.shift();
    }

    frame.push(page);
    pageFaults++;

    output += `Page ${page}: Frame [${frame.join(
      ", "
    )}], Page Faults: ${pageFaults}, Page Hits: ${pageHits}\n`;
  }

  const outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = `
      <div class="algorithm-container">
          <h2>LRU Algorithm</h2>
          <div class="result-box page-faults">
              <span>Page Faults:</span>
              <span>${pageFaults}</span>
          </div>
          <div class="result-box page-hits">
              <span>Page Hits:</span>
              <span>${pageHits}</span>
          </div>
          <div class="algorithm-info">
              <h3>About the Algorithm:</h3>
              <p>The LRU (Least Recently Used) algorithm replaces the least recently used page in the frame when a page fault occurs.</p>
              <h3>Advantages:</h3>
              <ul>
                  <li>Tends to perform well for programs with good locality of reference</li>
              </ul>
              <h3>Limitations:</h3>
              <ul>
                  <li>Requires tracking the usage history of pages</li>
                  <li>May have higher overhead due to maintaining usage history</li>
              </ul>
          </div>
      </div>
      <div class="dynamic-working">
          <h3>Working:</h3>
          <pre>${output}</pre>
      </div>
  `;
}

function runOPT() {
  const referenceString = document.getElementById("reference-string").value;
  const frameSize = parseInt(document.getElementById("frame-size").value, 10);
  const pages = referenceString.split(" ").map(Number);

  let frame = [];
  let pageFaults = 0;
  let pageHits = 0;

  let output = "";

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    if (frame.includes(page)) {
      pageHits++;
    } else {
      if (frame.length === frameSize) {
        let farthestIndex = -1;
        let victimPage;

        for (let j = 0; j < frame.length; j++) {
          const currentPage = frame[j];
          let found = false;

          for (let k = i + 1; k < pages.length; k++) {
            if (pages[k] === currentPage) {
              found = true;
              if (k > farthestIndex) {
                farthestIndex = k;
                victimPage = currentPage;
              }
              break;
            }
          }

          if (!found) {
            victimPage = currentPage;
            break;
          }
        }

        const index = frame.indexOf(victimPage);
        frame.splice(index, 1);
      }

      frame.push(page);
      pageFaults++;
    }

    output += `Page ${page}: Frame [${frame.join(
      ", "
    )}], Page Faults: ${pageFaults}, Page Hits: ${pageHits}\n`;
  }

  const outputContainer = document.getElementById("output-container");
  outputContainer.innerHTML = `
      <div class="algorithm-container">
          <h2>OPT Algorithm</h2>
          <div class="result-box page-faults">
              <span>Page Faults:</span>
              <span>${pageFaults}</span>
          </div>
          <div class="result-box page-hits">
              <span>Page Hits:</span>
              <span>${pageHits}</span>
          </div>
          <div class="dynamic-working">
              <h3>Working:</h3>
              <pre>${output}</pre>
          </div>
          <div class="algorithm-info">
              <h3>About the Algorithm:</h3>
              <p>The OPT (Optimal) algorithm replaces the page in the frame that will not be used for the longest period of time in the future.</p>
              <h3>Advantages:</h3>
              <ul>
                  <li>Has the lowest page fault rate among all algorithms</li>
              </ul>
              <h3>Limitations:</h3>
              <ul>
                  <li>Not practical for real-time use as it requires knowledge of future page references</li>
                  <li>Difficult to implement due to the need for future page reference prediction</li>
              </ul>
          </div>
      </div>
  `;
}
