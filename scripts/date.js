// Update copyright year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Update last modified date with proper formatting
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  const lastModified = document.lastModified || new Date().toLocaleString();
  // Format the date to match the wireframe: MM/DD/YYYY HH:MM:SS
  const date = new Date(lastModified);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  lastModifiedElement.textContent = `Last Modification: ${formattedDate} ${formattedTime}`;
}