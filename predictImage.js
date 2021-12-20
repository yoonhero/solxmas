class PredictImage {
  constructor() {
    this.URL = "https://teachablemachine.withgoogle.com/models/OIZ-f69pX/";
    this.model = null;
    this.maxPredictions = null;

    this.labelContainer = document.getElementById("mlabel-container");
    this.predictBtn = document.querySelector(".mobilePredict");
    this.tryAgain = document.querySelector(".tryAgain");
    this.loader = document.querySelector(".ploader");
    this.mresult = document.querySelector(".mresult");

    this.resultList = {
      solo: [
        "너무 슬퍼 울지는 마요...",
        "ㅠ.ㅠ",
        "슬픔담에는 기쁨이 찾아올거에요...",
        "결과는 장난일뿐이니 자신감을 가지세요!!!",
        "ㅎ.ㅎ",
        "솔크를 축하드립니다!!",
        "용기를 내보세요!",
        "친구들에게 공유해주세요 ㅎㅎ",
        "결과를 공유해주세요!!",
        "내가 여친/남친 해줄게",
      ],

      couple: [
        "^^",
        "너무 기뻐하지는 마세요. 결과는 장난일뿐이에요!",
        "(웃고 있는 모습 상상된다)",
        "저에게 감사해주세요!",
        "활짝 웃어요!",
      ],
    };
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

      if (Math.floor(prediction[i].probability.toFixed(2) * 100) > 50) {
        this.mresult.querySelector(".mresultTitle").innerText =
          prediction[i].className === "solo" ? "솔로입니다..." : "커플입니다!";

        this.mresult.querySelector(".mresultDes").innerText =
          prediction[i].className === "solo"
            ? this.resultList.solo[
                Math.floor(Math.random() * this.resultList.solo.length)
              ]
            : this.resultList.couple[
                Math.floor(Math.random() * this.resultList.couple.length)
              ];
      }
    }

    this.loader.classList.add("hidden");
    this.labelContainer.classList.remove("hidden");
    this.predictBtn.classList.add("hidden");
    this.tryAgain.classList.remove("hidden");
    this.mresult.classList.remove("hidden");
  }
}

export default PredictImage;
