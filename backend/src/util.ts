function logMessage(message: string) {
    let today = new Date()
    let time = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${('0' + today.getSeconds()).slice(-2)}`

    console.log(`[${time}] ${message}`)
}

export {
    logMessage
}