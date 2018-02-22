export default function getLoadTime (req) {
    let time = 0

    if (!req.timing) {
        return time
    }

    for (const [metric, value] of Object.entries(req.timing)) {
        if (metric === 'requestTime' || value === -1) {
            continue
        }
        time += value
    }
    return time
}
