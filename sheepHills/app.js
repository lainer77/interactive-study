import { Hill } from "./hill.js";
import { SheepController } from "../sheepController.js";
import { Sun } from "../sun.js";

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.hills = [
            new Hill("#fd6bea", 0.2, 12),
            new Hill("#ff59c2", 0.5, 8),
            new Hill("#ff4674", 1.4, 6),
        ];

        this.sheepController = new SheepController();
        this.suns = [new Sun(200, 10, "#ffb200")];

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        for (let i = 0; i < this.suns.length; i++) {
            this.suns[i].resize(this.stageWidth, this.stageHeight);
        }

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.suns.length; i++) {
            this.suns[i].draw(this.ctx, t);
        }

        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};
