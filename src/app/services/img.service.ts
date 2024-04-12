import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export interface Paths {
    [key:string]: string
}

@Injectable({
    providedIn: 'root'
})
export class ImgService {
    paths: Paths = {
        SOME: 'assets/img/111.svg', // todo пример подгрузки иконки
        DEFAULT_AVATAR: 'assets/img/default-user.svg',
        CAMERA: 'assets/img/camera.svg',
        PLAY: 'assets/img/play.svg',
    }

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {}

    getPath(key: string) {
        return this.paths[key];
    }

    getUserAvatar(avatarPath: string | undefined) {
        const avatar = avatarPath ? avatarPath : this.paths.DEFAULT_AVATAR;
        return this.getImg(avatar);
    }

    getImg(imgPath: string | undefined | null) {
        return imgPath ? this.domSanitizer.bypassSecurityTrustUrl(imgPath) : null;
    }

    includeSomeIcon() {
        this.matIconRegistry.addSvgIcon(
            'some',
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.paths.SOME)
        );
    }

    includeCameraIcon() {
        this.matIconRegistry.addSvgIcon(
            'camera',
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.paths.CAMERA)
        );
    }

    includePlayIcon() {
        this.matIconRegistry.addSvgIcon(
            'play',
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.paths.PLAY)
        );
    }
}