import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoaderService {
    public static fullLoadingCount = 0;
    public static smallLoadingCount = 0;
    public static FULL_LOADER = 'full';
    public static SMALL_LOADER = 'small';
    public lodingObserval = new Subject<any>();
    public loaderDisplay = true;

    getSmallLoaderCount(): number {
        return LoaderService.smallLoadingCount;
    }

    getFullLoaderCount(): number {
        return LoaderService.fullLoadingCount;
    }

    showLoader(loaderType = LoaderService.FULL_LOADER): void {
        if (loaderType === LoaderService.FULL_LOADER) {
            LoaderService.fullLoadingCount++;
            this.lodingObserval.next(LoaderService.fullLoadingCount);
        } else if (loaderType === LoaderService.SMALL_LOADER) {
            LoaderService.smallLoadingCount++;
        }
    }

    hideLoader(loaderType = LoaderService.FULL_LOADER): void {
        if (loaderType === LoaderService.FULL_LOADER) {
            LoaderService.fullLoadingCount--;
            this.lodingObserval.next(LoaderService.fullLoadingCount);
        } else if (loaderType === LoaderService.SMALL_LOADER) {
            LoaderService.smallLoadingCount--;
        }
    }
}
