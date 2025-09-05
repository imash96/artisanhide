declare module "canvas-confetti" {
    export interface Options {
        particleCount?: number;
        angle?: number;
        spread?: number;
        startVelocity?: number;
        decay?: number;
        gravity?: number;
        ticks?: number;
        origin?: { x?: number; y?: number };
        colors?: string[];
        shapes?: ("square" | "circle")[];
        scalar?: number;
        zIndex?: number;
        disableForReducedMotion?: boolean;
    }

    type ConfettiFn = (options?: Options) => void;

    const confetti: ConfettiFn;
    export default confetti;
}