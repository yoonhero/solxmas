import PredictImage from "./predictImage.js";
import Quote from "./quote.js";
import WebcamTensorflow from "./webcam.js";

class App {
  constructor() {
    this.screen = screen.width;
    this.loading = false;

    this.desktop = document.querySelector(".desktop");
    this.mobile = document.querySelector(".mobile");
    this.loadingComponent = document.querySelector(".loading");

    this.init();
  }

  async init() {
    window.addEventListener("resize", () => {
      this.screen = screen.width;

      this.initScreen();
    });
    // this.desktop.classList.add("hidden");
    // this.mobile.classList.add("hidden");

    this.loading = true;
    // this.loadingComponent.classList.remove("hidden");

    await this.initScreen();
  }

  async initScreen() {
    const countDate = new Date("dec 25, 2021 00:00:00").getTime();
    let now = new Date().getTime();

    let gap = countDate - now;

    if (this.screen < 680) {
      // desktop

      if (this.loading) {
        this.quote = new Quote(Math.floor(Math.random() * 6 + 2) * 1000);
        // load tensorflow model first
        this.webcamTensorflow = new WebcamTensorflow();

        document.querySelector(".loadingText").innerText = "인공지능 로딩중...";
        const ok = await this.webcamTensorflow.init();

        if (ok) {
          this.loading = false;
          this.quote.deleteInterval();

          let gifImg = document.createElement("img");

          gifImg.className = "gif";
          gifImg.src = "https://media2.giphy.com/media/VKwspRV2pafJu/giphy.gif";

          document.querySelector(".gifContainer").appendChild(gifImg);
        } else {
          return;
        }
      }

      this.loadingComponent.classList.add("hidden");
      this.desktop.classList.remove("hidden");

      this.countdown = this.desktop.querySelector(".countdonwText");

      this.countdown.innerText =
        "D-" + String(Math.floor(gap / 1000 / 60 / 60 / 24));
    } else {
      // mobile

      if (this.loading) {
        this.predictImage = new PredictImage();

        this.quote = new Quote(Math.floor(Math.random() * 6 + 1) * 1000);
        document.querySelector(".loadingText").innerText = "인공지능 로딩중...";

        await this.predictImage.Init();

        this.loading = false;
        this.quote.deleteInterval();

        let gifImg = document.createElement("img");

        gifImg.className = "gif";
        gifImg.src = "https://media2.giphy.com/media/VKwspRV2pafJu/giphy.gif";

        document.querySelector(".mobileGifContainer").appendChild(gifImg);
      }

      this.loader = document.querySelector(".ploader");

      document
        .querySelector(".mobilePredict")
        .addEventListener("click", async () => {
          this.loader.classList.remove("hidden");
          await this.predictImage.Predict();
        });

      this.loadingComponent.classList.add("hidden");
      this.mobile.classList.remove("hidden");

      this.countdown = this.mobile.querySelector(".countdonwText");

      this.countdown.innerText =
        "D-" + String(Math.floor(gap / 1000 / 60 / 60 / 24));
    }
  }
}

window.onload = () => {
  new App();
};
