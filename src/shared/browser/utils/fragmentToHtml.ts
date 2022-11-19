export const fragmentToHtml = (fragment: DocumentFragment) => {
  const div = document.createElement('div');
  div.appendChild(fragment);
  return div.innerHTML;
};
