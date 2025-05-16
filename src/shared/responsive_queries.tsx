import { useMediaQuery } from "react-responsive";

/**
 * @returns Whether the current screen size is of medium size (768px)
 */
export function isMd(): boolean {
    return useMediaQuery({ query: "(min-width: 768px)" });
}

/**
 * @returns Inverse of {@link isMd}
 */
export function untilMd(): boolean {
    return !isMd();
}
