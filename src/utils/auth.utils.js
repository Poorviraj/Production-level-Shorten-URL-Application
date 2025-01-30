function CheckEmailDomainIsPersonalOrNotUtil(emailDomain){
    try{

        const PersonalEmailDomainMap = new Map([
            ['gmail.com', 'Gmail'],
            ['outlook.com', 'Outlook'],
            ['yahoo.com', 'Yahoo'],
            ['protonmail.com', 'ProtonMail'],
            ['icloud.com', 'iCloud'],
            ['zoho.com', 'Zoho'],
            ['aol.com', 'AOL'],
            ['gmx.com', 'GMX'],
            ['mail.com', 'Mail.com'],
            ['yandex.com', 'Yandex'],
            ['fastmail.com', 'FastMail'],
            ['tutanota.com', 'Tutanota'],
            ['hey.com', 'Hey'],
            ['hushmail.com', 'Hushmail'],
            ['lycos.com', 'Lycos'],
            ['inbox.com', 'Inbox'],
            ['mail.ru', 'Mail.ru']
        ]);

        if(PersonalEmailDomainMap.has(emailDomain)){
            return {
                success: true,
                companyName: PersonalEmailDomainMap.get(emailDomain)
            }
        } else{
            return {
                success: false,
                message: "Domain not present in CheckEmailDomainIsPersonalOrBusinessUtil"
            }
        }

    } catch(error){
        console.log(`Error in CheckEmailDomainIsPersonalOrBusinessUtil with error :- ${error}`)
    }
}

module.exports = {
    CheckEmailDomainIsPersonalOrNotUtil
}