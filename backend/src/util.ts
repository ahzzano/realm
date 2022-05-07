function logMessage(message: string) {
    let today = new Date()
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    console.log(`[${time}] ${message}`)
}

export {
    logMessage
}