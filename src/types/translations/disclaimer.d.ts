export interface DisclaimerTranslation {
    title: string;
    sections: {
        title: string;
        content: string;
    }[];
    conclusion: string;
    agreeButton: string;
    leaveButton: string;
}