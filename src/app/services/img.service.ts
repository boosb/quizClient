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
        SOME: 'assets/img/111.svg',
        DEFAULT_AVATAR: 'assets/img/default-user.svg'
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
        return this.domSanitizer.bypassSecurityTrustUrl(avatar);
    }

    includeSomeIcon() {
        this.matIconRegistry.addSvgIcon(
            'some',
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.paths.SOME)
          );
    }
}