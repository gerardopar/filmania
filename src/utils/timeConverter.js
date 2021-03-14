function timeConverter(n) {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours}hr${rhours > 1 ? 's' : ''} ${rminutes}min${rminutes > 1 ? 's' : ''}`;
}

export { timeConverter as default };
