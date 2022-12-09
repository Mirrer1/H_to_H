const breakPoints = [768, 1200];

const mobile = `@media (min-width: ${breakPoints[0]}px)`;
const desktop = `@media (min-width: ${breakPoints[1]}px)`;

const media = { mobile, desktop };
// const media = breakPoints.map(bp => `@media (min-width: ${bp}px)`);

export default media;
