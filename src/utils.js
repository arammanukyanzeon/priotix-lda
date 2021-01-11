
export const cleanText = (text, topic) => {
    const regExps = [
        new RegExp(`#?${topic}`, "gi"),
        /https?:\/\/[\n\S]+/g,
        /RT @[^:]+:/gi,
        / @[^ ]+/g,
        /^@[^ ]+ /g,
    ];
    const oldText = text;

    regExps.forEach((regExp) => {
        text = text.replace(regExp, '');
    });
    return text;
}
