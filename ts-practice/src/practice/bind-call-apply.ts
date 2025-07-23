export const giveMessage = {
    message: 'Fuck You 🖕.'
}

export const display = function (this: any, name: string) {
    console.log("\n\n%s %s", name, this.message)
}