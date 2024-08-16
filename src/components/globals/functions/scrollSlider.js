
export function scrollSlider(sliderUl) {

    // const sliderUl = parentTag.

    console.log(sliderUl)
    let pressed = false
    let startX = 0
    let scrollLeft;

    sliderUl.forEach((ulElm) => {

        ulElm.addEventListener('mousedown', (event) => {
            pressed = true;
            if (startX > 0) { return }

            startX = event.pageX - ulElm.offsetLeft;
            scrollLeft = ulElm.scrollLeft;
        })

        ulElm.addEventListener('mouseleave', () => {
            pressed = false
        })

        window.addEventListener('mouseup', () => {
            pressed = false
        })

        ulElm.addEventListener('mousemove', (event) => {
            if (!pressed) { return }

            const x = event.pageX - ulElm.offsetLeft;
            const walk = x - startX;
            ulElm.scrollLeft = scrollLeft - walk;
        })
    })


}
