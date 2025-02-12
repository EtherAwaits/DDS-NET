const MAX_LINES = 50; // Maximum number of visible lines. Keep low for low perfomance systems
const queue = []; // Message queue
const terminal = document.getElementById('terminal');
const typespeed = 8;

let currentLine = document.createElement('div'); // Current line container
const cursor = document.createElement('span'); // Typing cursor
cursor.className = 'typing-cursor';
currentLine.appendChild(cursor); // Cursor starts in the current line
terminal.appendChild(currentLine);

const tagStack = []; // Stack to track open tags
let animationClass = null; // Animation class to apply after line completion

// Checks if max lines is reached and remove last line
function truncateTerminal() {
  while (terminal.childNodes.length > MAX_LINES) {
    terminal.removeChild(terminal.firstChild); // Remove the oldest line
  }
}

// Handles color tags
function createColoredSpan(color) {
  const span = document.createElement('span');
  span.style.color = color;
  return span;
}

// Handles style tags
function createStyledSpan(style) {
  const span = document.createElement('span');
  if (style === 'b') span.style.fontWeight = 'bold';
  else if (style === 'i') span.style.fontStyle = 'italic';
  else if (style === 'u') span.style.textDecoration = 'underline';
  return span;
}

function typechar(message, index, callback) {
  if (index < message.length) {
    // Handle double line breaks for blank lines
    if (message.startsWith('\n\n', index)) {
		if (animationClass) {
        currentLine.classList.add(animationClass); // Add animation class
        animationClass = null; // Reset after applying
      }
      // Create a blank line
      const blankLine = document.createElement('div');
      terminal.insertBefore(blankLine, currentLine.nextSibling);
      // Create a new current line
      currentLine = document.createElement('div');
	  const br = document.createElement("br");
	  blankLine.appendChild(br);
      currentLine.appendChild(cursor); // Add cursor to the new line
      terminal.insertBefore(currentLine, blankLine.nextSibling);
      index += 2; // Move past the two newlines
    }
    // Handle single line breaks
    else if (message[index] === '\n') {
		if (animationClass) {
        currentLine.classList.add(animationClass); // Add animation class
        animationClass = null; // Reset after applying
      }
      // Create a new current line
      const newLine = document.createElement('div');
      currentLine = newLine;
      currentLine.appendChild(cursor); // Add cursor to the new line
      terminal.insertBefore(newLine, cursor.nextSibling);
      index++; // Move past the newline
    }
    // Handle tabs
    else if (message[index] === '\t') {
      const tab = document.createTextNode('\u00A0\u00A0\u00A0\u00A0'); // Four spaces for tab
      currentLine.insertBefore(tab, cursor); // Insert tab before the cursor
      index++; // Move past the tab
    }
    // Adds color tags
    else if (message.startsWith('<color:', index)) {
      const endTag = message.indexOf('>', index);
      if (endTag !== -1) {
        const color = message.substring(index + 7, endTag); // Extract color
        const span = createColoredSpan(color);
        currentLine.insertBefore(span, cursor); // Add colored span to the current line
        tagStack.push(span); // Track the open color span
        index = endTag + 1; // Move past the color tag
      }
    } else if (message.startsWith('<b>', index) || message.startsWith('<i>', index) || message.startsWith('<u>', index)) {
      const tag = message.substring(index + 1, index + 2); // Extract tag type (b, i, u)
      const span = createStyledSpan(tag);
      currentLine.insertBefore(span, cursor); // Add styled span
      tagStack.push(span); // Track the open tag
      index += 3; // Move past the opening tag
    } else if (message.startsWith('</b>', index) || message.startsWith('</i>', index) || message.startsWith('</u>', index)) {
      if (tagStack.length > 0) {
        tagStack.pop(); // Close the last opened style tag
      }
      index += 4; // Move past the closing tag
    } else if (message.startsWith('</color>', index)) {
      if (tagStack.length > 0) {
        tagStack.pop(); // Close the current color span
      }
      index += 8; // Move past the closing tag
    }  else if (message.startsWith('<anim:', index)) {
      const endTag = message.indexOf('>', index);
      if (endTag !== -1) {
        animationClass = message.substring(index + 6, endTag); // Extract animation class
        index = endTag + 1; // Move past the animation tag
      }
    }
    // Handle regular characters
    else {
      const char = document.createTextNode(message[index]);
      if (tagStack.length > 0) {
        tagStack[tagStack.length - 1].appendChild(char); // Append to the last color span
      } else {
        currentLine.insertBefore(char, cursor); // Append before the cursor
      }
      index++; // Move to the next character
    }

    truncateTerminal(); // Ensure lines don't exceed the limit
    terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
    setTimeout(() => typechar(message, index, callback), typespeed);
  } else {
    if (callback) callback(); // Execute the callback when typing finishes
    queue.shift(); // Remove the current message from the queue
    processQueue(); // Process the next message in the queue
  }
}

function termtext(message, callback) {
  queue.push({ message, callback });
  if (queue.length === 1) {
    processQueue(); // Start processing the queue if it's the only message
  }
}

function processQueue() {
  if (queue.length === 0) return; // No messages to process

  const { message, callback } = queue[0]; // Get the first message in the queue
  typechar(message, 0, callback);
}

// Get Username
if (!localStorage.getItem("system")) {
  system = "<USER>";
} else {
  system = JSON.parse(localStorage.getItem("system")).username;
}
// Bootup message
termtext(`RESET:\n\tSEI\n\tCLC\n\tXCE\n\tCLD\n\n\tX16\n\tM8\n\n\tLDX\t#1FFFH\n\tTXS\n\tSTZ\tNMITIME\n\tLDA\t#BLANKING\n\tSTA\tINIDSP\n\n\tBJSR\tATLUS\n\n\t'EL ELOHIM ELOHO ELOHIM SEBAOTH'\n\t'ELION EIECH ADIER EIECH ADONAI'\n\t'JAH SADAI TETRAGRAMMATON SADAI'\n\t'AGIOS O THEOS ISCHIROS ATHANATOS'\n\t'AGLA AMEN'\n\n<anim:term-blue><color:yellow>Connecting</color> to DDS-NET...<color:green> Complete</color>.\nWelcome <color:blue>${system}</color>, input command...\n\n<color:green>DDS-NET@${system}</color>:<color:blue>~</color>$\n`);