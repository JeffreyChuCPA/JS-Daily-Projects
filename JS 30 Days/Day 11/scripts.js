//Topics learned
//properties and methods of video element such as pause(), play(), .paused, .currentTime, .duration




//get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]"); //selecting data-skip attribute
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector('button[name=fullscreen]')

//build functions
const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  //applied on flex basis of the css property that is in a %
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleProgressUpdate(e) {
const updateTime = (e.offsetX / progress.offsetWidth) * video.duration; //% of where you click on teh total progress bar
video.currentTime = updateTime;
}

function handleFullScreen() {
  video.requestFullscreen && video.requestFullscreen()
}

//hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
//event of time increasing in video
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", handleProgressUpdate);
progress.addEventListener("mousemove", (e) => mousedown && handleProgressUpdate(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", handleFullScreen);
