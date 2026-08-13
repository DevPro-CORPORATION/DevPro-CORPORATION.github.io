import { IRealityEngine } from './IRealityEngine';

export class RealityEngine implements IRealityEngine {
    private currentReality: string = 'reality-deep-space';

    initialize(): void {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dxp-reality');
            if (saved) {
                this.currentReality = saved;
            }
            this.applyReality(this.currentReality);
        }
    }

    setReality(realityId: string): void {
        this.currentReality = realityId;
        if (typeof window !== 'undefined') {
            localStorage.setItem('dxp-reality', realityId);
            this.applyReality(realityId);
        }
    }

    getCurrentReality(): string {
        return this.currentReality;
    }

    private applyReality(realityId: string): void {
        document.documentElement.setAttribute('data-reality', realityId);
    }
}
