const classNames = (...classes: (string | Record<string, boolean>)[]): string => {
    const result: string[] = [];

    classes.forEach((item) => {
        if (typeof item === 'string') {
            result.push(item);
        } else if (typeof item === 'object') {
            Object.keys(item).forEach((key) => {
                if (item[key]) {
                    result.push(key);
                }
            });
        }
    });

    return result.join(' ');
}

export default classNames