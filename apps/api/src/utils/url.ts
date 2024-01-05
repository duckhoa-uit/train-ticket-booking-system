export function autoPrependHttps(inputUrl: string): string {
  // Check if the inputUrl already starts with 'http://' or 'https://'
  if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
    return inputUrl; // No need to prepend, return as is
  } else {
    // If the domain is 'localhost', prepend 'http://'; otherwise, prepend 'https://'
    const protocol = window.location.hostname === "localhost" ? "http://" : "https://";
    return protocol + inputUrl;
  }
}
