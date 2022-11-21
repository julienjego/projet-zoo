function removeAccents(s: string): string {
    let i =
        "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž".split(
            ""
        );
    let o =
        "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz".split(
            ""
        );
    let map: any = {};
    i.forEach(function (el, idx) {
        map[el] = o[idx];
    });
    return s
        .replace(/[^A-Za-z0-9]/g, function (ch) {
            return map[ch] || ch;
        })
        .toLowerCase();
}

export default removeAccents;
