export function getCookie(name)  { // This function is used to find cookies and make it available to other files.
  /* 'document' means the current webpage loaded and 'document.cookie' gives the cookies that JavaScript
  is allowed to read for the page. e.g. csrftoken=abc123; sessionid=xyz789; theme=dark */
  const cookies = document.cookie.split('; ') // and this makes it into an array

  for (const cookie of cookies) { // Takes this string 'csrftoken=abc123'
    const [cookieName, cookieValue] = cookie.split('=') // make it into '["csrftoken", "abc123"]'

    /* '===' means strict equality and checks if the cookie is the same with the cookie we are checking */
    if (cookieName === name)  {
      return cookieValue
    }
  }

  return null
}