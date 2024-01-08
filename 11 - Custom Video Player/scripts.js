/* get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const progressFilled = player.querySelector(".progress__filled");
const progress = player.querySelector(".progress")
const ranges = player.querySelectorAll("input[type='range']")
const buttons = player.querySelectorAll("[data-skip]");

/* add function */
function handleToggle() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function videoTimeChange() {
    const progress = (video.currentTime / video.duration) * 100;
    // console.log(progress);
    progressFilled.style.flexBasis = `${progress}%`;
}

function progressChange(e) {
    const currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = currentTime;
}

function changeToggle() {
    if (this.paused) {
        toggle.textContent = "►";
    } else {
        toggle.textContent = "❚ ❚";
    }
}

function handleRange() {
    video[this.name] = this.value;
}

function buttonClick() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

/* catch event */
video.addEventListener("click", handleToggle);
video.addEventListener("timeupdate", videoTimeChange);
video.addEventListener("play", changeToggle);
video.addEventListener("pause", changeToggle);
video.addEventListener("loadedmetadata", videoTimeChange);

toggle.addEventListener("click", handleToggle);

ranges.forEach(range => range.addEventListener("change", handleRange));

buttons.forEach(button => button.addEventListener("click", buttonClick));

let mouseDown = false;
progress.addEventListener("mousemove", (e) => mouseDown && progressChange(e));
progress.addEventListener("mousedown", (e) => {
    progressChange(e);
    mouseDown = true;
});
progress.addEventListener("mouseup", () => mouseDown = false);
