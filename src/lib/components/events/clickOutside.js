/** Dispatch event on click outside of node */
export function clickOutside(node) {

    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }

    document.addEventListener('pointerdown', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('pointerdown', handleClick, true);
        }
    }
}