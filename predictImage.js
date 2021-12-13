class PredictImage {
  constructor() {
    this.URL = "https://teachablemachine.withgoogle.com/models/OIZ-f69pX/";
    this.model = null;
    this.maxPredictions = null;

    this.labelContainer = document.getElementById("mlabel-container");
    this.predictBtn = document.querySelector(".mobilePredict");
    this.tryAgain = document.querySelector(".tryAgain");
    this.loader = document.querySelector(".ploader");
  }
  async Init() {
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
  }

  async Predict() {
    this.tryAgain.classList.remove("hidden");

    const thumbnailElement = document.querySelector(".thumbnailElement");
    const prediction = await this.model.predict(thumbnailElement, false);

    for (let i = 0; i < this.maxPredictions; i++) {
      let posibility =
        String(Math.floor(prediction[i].probability.toFixed(2) * 100)) + "%";

      document.querySelectorAll(".mcategory")[i].innerText =
        prediction[i].className;
      document.querySelectorAll(".mbar_text")[i].innerText = posibility;
      document.querySelectorAll(".mbar_main")[i].style.width = posibility;
    }

    this.loader.classList.add("hidden");
    this.labelContainer.classList.remove("hidden");
    this.predictBtn.classList.add("hidden");
    this.tryAgain.classList.remove("hidden");
  }
}

export default PredictImage;
