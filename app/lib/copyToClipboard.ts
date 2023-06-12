/**
 * Copy text to clipboard。
 *   When the page is in an insecure HTTP context, navigator.clipboard is undefined.
 *  @param text: text to be copied
 *  @returns Promise<boolean>
 */
const copyTextToClipboard = (text: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve(true))
        .catch(() => reject(false))
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement('textarea')
      textArea.value = text

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = 'absolute'
      textArea.style.display = 'none'
      textArea.style.left = '-999999px'

      document.body.prepend(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        resolve(true)
      } catch (error) {
        reject(false)
      } finally {
        textArea.remove()
      }
    }
  })

export default copyTextToClipboard
