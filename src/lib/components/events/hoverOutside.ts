/** Dispatch event on hover outside of node */
export function hoverOutside(node) {
  const handleHover = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('hover_outside', node));
    }
  };

  document.addEventListener('mouseenter', handleHover, true);

  return {
    destroy() {
      document.removeEventListener('mouseenter', handleHover, true);
    },
  };
}
