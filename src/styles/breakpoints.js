const points = [0, 992];

export const breakpoints = {
  mobile: 0,
  desktop: 1,
};

export function mq(minWidth) {
  return `@media screen and (min-width: ${points[minWidth]}px)`;
}
