declare module "aos" {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;

  const aos: {
    init: typeof init;
    refresh: typeof refresh;
    refreshHard: typeof refreshHard;
  };

  export default aos;
}