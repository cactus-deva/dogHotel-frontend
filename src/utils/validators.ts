export const isName = (name:string):boolean => {
    const regex = /^[A-Za-z]+$/
    return regex.test(name)
}
export const isUsername = (username:string):boolean => {
    const usernameRegex = /^[a-zA-Z0-9._]{8,20}$/
    return usernameRegex.test(username)
}
export const isPassword = (password: string):boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
}
export const isEmptyName = (name: string) => {
    const nameStr = name.trim()
    if(nameStr.length === 0 || nameStr === "") {
        return ""
    }
    return nameStr
}
export const showDDMMYY = (date:string) => {
    return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const setDateTime = (date?:string) => {
    const targetDate = new Date(date ?? Date.now())
    targetDate.setHours(0,0,0,0)
    return targetDate
}