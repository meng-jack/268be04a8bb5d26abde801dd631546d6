import { useMediaQuery } from "react-responsive";

/**
 * @param width An optional size (in px) to check against the constraints
 * @returns Whether the current screen size is of medium size (768px)
 */
export function isMd(width?: number): boolean {
    return width !== undefined ? width >= 768 : useMediaQuery({ query: "(min-width: 768px)" });
}

/**
 * @param width An optional size (in px) to check against the constraints
 * @returns Whether the current screen size if of large size (1024px)
 */
export function isLg(width?: number): boolean {
    return width !== undefined ? width >= 1024 : useMediaQuery({ query: "(min-width: 1024px" });
}


