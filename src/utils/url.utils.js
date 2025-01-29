function generateUniqueIdforURLUtil(charCount){
    const string = "asdfghjklqwertyuiopmnbvcxzQAWSEDRFTGYHUJIKOLPMNBVCXZ0123456789";
    let aa = ""

    for(let i=0; i<charCount; i++){
        aa += string.charAt(Math.floor(Math.random() * string.length))
    }
    return aa
}

module.exports = {
    generateUniqueIdforURLUtil
}