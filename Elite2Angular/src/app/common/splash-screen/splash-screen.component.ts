import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Images } from "@common/beans/Images";
import { LoginService } from "@common/login/service/login.service";
import { SplashScreenService } from "./splash-screen.service";

@Component({
  selector: "app-splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.scss"],
})
export class SplashScreenComponent implements OnInit {
  // The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition;

  loadingImages: Images[];
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;
  showLoaderImage: string;

  constructor(
    private splashScreenService: SplashScreenService,
    private loginService: LoginService,) {

    }
  ngOnInit() {
    this.loadingLogo();
    // Somewhere the stop method has been invoked
    this.splashScreenService.subscribe((res) => {
      this.hideSplashAnimation();
    });
  }
  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = !this.showSplash;
    }, 1000);
  }
  loadingLogo() {
    const serve = this.loginService.getLoginLogo();
    serve.subscribe((resp) => {
      if (resp !== null) {
        this.loadingImages = resp;
        let index = this.loadingImages.findIndex(x => x.imageObjectSeq === 1);
        if (this.loadingImages[index].imageObjectSeq == 1 && this.loadingImages[index].imageThumbnail) {
          this.showLoaderImage = this.BASE64IMAGE + this.loadingImages[index].imageThumbnail;
          // bodyBgImage[index]["imageFull"] = this.showLoaderImage;
        }
      }
    });
  }
  get BASE64IMAGE(): string {
    return 'data:image/JPEG;base64,';
  }
  get BASE64PNG(): string {
      return 'data:image/PNG;base64,';
  }
}
