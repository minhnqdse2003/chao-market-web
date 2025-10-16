export interface GuestNoticeTranslations {
    title: string;
    desc1: string;
    desc2: string;
    linkSignUp: string;
    desc3: string;
    linkLogIn: string;
    desc4: string;
    okButton: string;
}

export interface MemberNoticeTranslations {
    title: string;
    reminderText: string;
    desc1: string;
    desc2: string;
    desc3: string;
    linkTerms: string;
    agreeButton: string;
}

export interface PerformanceNoticeTranslations {
    guest: GuestNoticeTranslations;
    member: MemberNoticeTranslations;
    mainSection: {
        independentVerification: string;
    };
}