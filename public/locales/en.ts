import { TranslationsStructure } from '@/types/translations';

export const en: TranslationsStructure = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        loading: 'Loading...',
        continue: 'Continue',
        email: 'Email',
        password: 'Password',
        orContinueWith: 'Or continue with',
        firstName: 'First name',
        lastName: 'Last name',
        fullName: 'Full Name',
        name: 'Name',
        emailAddress: 'Email address',
        confirmPassword: 'Confirm password',
        dateOfBirth: 'Birthday (optional)',
        dateOfBirthRequired: 'Birthday',
        gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other',
            selfDescribe: 'Prefer to self-describe',
            label: 'Gender',
        },
        back: 'Back',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        currentPassword: 'Current Password',
        sending: 'Sending...',
        phoneNumber: 'Phone number (optional)',
        backToSignUp: '← Back to Sign Up',
        lastUpdated: 'Last updated: {date}',
        backToHome: '← Back to Home',
        scrollToTop: 'Back To Top',
        autoCloseMessage:
            'This will automatically close in <span>{countdown} second{plural}<span/>.',
        search: 'Search',
        contacts: 'Contacts',
        dark: 'Dark',
        light: 'Light',
        socialNetwork: 'Social network (optional)',
        logOut: 'Log Out',
        joined: 'Joined',
        changePassword: 'Change Password',
        selectStartDate: 'Select start date',
        selectEndDate: 'Select end date',
        allNotification: 'All notifications',
        unread: 'Unread',
        emails: 'Emails',
        pushNotification: 'Push notifications',
        date: 'Date',
        weekday: 'Weekday',
        category: 'Category',
        headline: 'Headline',
        like: 'Like',
        views: 'Views',
        page: 'Page',
        rowPerPage: 'Rows per page',
        noFeedFound: 'No feeds have been posted.',
        filter: 'Filter',
        filterBySearch: {
            filterBy: 'Filter By',
            search: 'Search',
        },
        time: 'Time',
        timePresets: {
            today: 'Today',
            thisWeek: 'this week',
            thisMonth: 'this month',
            custom: 'Custom',
        },
        customDateRange: {
            rangeTitle: 'Custome data range',
            startDatePlaceholder: 'Select start date',
            endDatePlaceholder: 'Select end date',
            calendarAriaLabel: 'Date selection calendar',
        },
        sources: 'Sources',
        actions: {
            clearAll: 'Clear All',
            apply: 'Apply',
        },
        sortBy: {
            label: 'Sort by',
            featured: 'Featured',
        },
        dateSort: {
            label: 'Date',
            newestFirst: 'Newest first',
            oldestFirst: 'Oldest first',
        },
        viewSort: {
            mostViewedFirst: 'Most Viewed',
            leastViewedFirst: 'Least Viewed',
        },
        default: 'Default',
        market: 'Market',
        marketType: {
            all: 'All',
            stocks: 'Stocks',
            currencies: 'Currencies',
            cryptocurrencies: 'Cryptocurrencies',
            commodities: 'Commodities',
        },
        recommended: 'Recommended',
        hottest: 'Hottest',
        mostViewed: 'Most Viewed',
        topRated: 'Top Rated',
        source: 'Source',
        share: 'Share',
        posts: 'Posts',
        post: 'Post',
        total: 'Total',
        minRead: 'min read',
        tableOfContent: 'Table of Contents',
        profit: 'Profit',
        algoTrading: 'Algo Trading',
        manualTrading: 'Manual Trading',
        over20: 'Over 20%',
        lowToHight: 'Lowest',
        hightToLow: 'Highest',
        lessThanManual: 'Less than manual trading',
        moreThanManual: 'More than manual trading',
        startDate: 'Start Date',
        deposit: 'Deposit',
        month: 'Month',
        withdraw: 'Withdraw',
        gain: 'Gain',
        gainTooltipTitle: 'Gain (Time-Weighted Return)',
        gainTooltip: `This metric measures the compound growth of the account based on <strong>GIPS® standards</strong>.<br/>
The <strong>Time-Weighted Return (TWR)</strong> method mathematically eliminates the distorting effects of deposits and
withdrawals, providing a fair and accurate assessment of the Trader's performance skill.`,
        absoluteGain: 'Absolute Gain',
        absoluteGainTitleTooltip: 'Absolute Gain (Return On Investment)',
        absoluteGainTooltipContent:
            'This metric reflects the total percentage profit on invested capital, known as <strong>Return On' +
            ' Investment (ROI)</strong>.<br/>' +
            'Unlike <strong>Time-Weighted Return (TWR)</strong>, it indicates the specific return on your deposits and is directly influenced\n' +
            'by the timing and size of additional capital injections.',
        daily: 'Daily',
        drawdown: 'Drawdown',
        balance: 'Balance',
        equity: 'Equity',
        highest: 'Highest',
        financingCost: 'Financing Cost',
        financingCostTooltip: `The cost incurred (or interest earned) for holding a <strong>leveraged position</strong> open past a specific interval (typically
overnight or daily rollover). It reflects the cost of borrowing capital and the interest rate differential between assets.<br/><ul>
            <li><strong>Forex/Commodities:</strong> Known as <strong>Swap Fee</strong>.</li>
            <li><strong>Crypto (Perpetuals):</strong> Known as <strong>Funding Rate</strong> (often settled every 8 hours).</li>
            <li><strong>Stocks/Indices:</strong> Known as <strong>Financing Charge</strong> (interest on margin).</li>
        </ul>`,
        monthly: 'Monthly',
        letUsHelpYou: 'Let us help you',
        consulting: 'Consulting',
        consultingSubtitle: 'Let us help you find the best solutions',
        support: 'Support',
        hereToHelp: "We're here to help",
        contact: 'Contact',
        generalInquiries: 'General inquiries',
        phone: 'Phone',
        workingHours: 'Business Hours',
        phoneHours: 'Monday – Friday,<br/>from 09:00 to 17:00',
        chatOnWhatsApp: 'Chat on WhatsApp',
        information: 'Informations',
        basicInformationTitle: 'Basic Information',
        updatePersonalInfoDesc:
            'Update your personal details and profile information.',
        contactInformationTitle: 'Contact Information',
        updateContactDetailsDesc:
            'Update your contact details and communication preferences.',
        tags: 'Tags',
        updateProfile: 'Update Profile',
        verify: 'Verify',
        changePasswordSubtitle:
            'Please enter your current password and new password.',
        changeEmail: 'Change Email',
        changeEmailSubtitle:
            'Please enter your new email address and confirm it.',
        newEmail: 'New Email',
        confirmNewEmail: 'Confirm New Email',
        avatarUploadLimit: 'PNG, JPG up to',
        welcomeToChaoMarket: 'Welcome to Chào Market',
        yourAccountHasBeenCreated: 'Your account has been created',
        type: 'Type',
        price: 'Price',
        description: 'Description',
        instruction: 'Guide',
        paid: 'Paid',
        fullSolution: 'Full Solutions',
        customSolution: 'Custom Solutions',
        bookAConsultationSuccessTitle: 'Booking Successful!',
        bookAConsultationSuccessDesc:
            'Thank you for your interest. The Chào Market team will contact you as soon as possible.',
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now',
    },
    auth: {
        login: 'Log In',
        signup: 'Sign Up',
        forgotPassword: 'Forgot Password?',
        otpSentToEmail: "We've sent a verification code to",
        otpVerificationFailed: 'OTP verification failed',
        failedToVerifyOtp: 'Failed to verify OTP',
        welcomeBack: 'Welcome back!',
        invalidCredentials: 'Invalid credentials',
        loginError: 'An error occurred during login',
        signInError: 'An error occurred during sign in',
        noAccountPrompt: "Don't have an account?",
        oauth: {
            unknownError: 'An unknown error occurred.',
            accountNotLinked:
                'This email is already associated with a different sign-in method.',
            accessDenied: 'Access denied.',
        },
        createAccountTitle: 'Create your account.',
        signupSuccessMessage:
            'Account created successfully! Please verify your email.',
        registrationFailed: 'Registration failed',
        registrationError: 'An error occurred during registration',
        failedToSendOtp: 'Failed to send verification code',
        alreadyHaveAccount: 'Already have an account?',
        verifyEmailTitle: 'Verify your email',
        weHaveSendOtpToYourEmail: `We&apos;ve sent a verification code to`,
        otpResentSuccess: 'Verification code resent successfully!',
        failedToResendOtp: 'Failed to resend verification code',
        didNotReceiveCode: "I didn't receive a code",
        resendOtp: 'Resend OTP',
        termsAgreement: {
            start: 'By creating an account, I confirm I am',
            startAgePrivacy: 'at least 18 years old',
            startEndContent: 'and',
            startNewLine: "I agree to the website's",
            privacyNotice: 'Privacy Policy',
            and: 'and',
            termsOfUse: 'Terms of Use',
        },
        termsNotAccepted:
            'You must agree to the Terms of Use and Privacy Policy to create an account.',
        resetPassword: {
            goToLogin: 'Go to Login',
            sendResetCode: 'Send Reset Code',
            updatePassword: 'Update Password',
            rememberPassword: 'Remember your password?',
            title: 'Reset your password',
            setNewPasswordTitle: 'Set new password',
            completeTitle: 'Successfully !',
            emailSubtitle:
                'You will receive an email to reset your password in a few minutes.',
            otpSubtitle: 'Enter the 6-digit code sent to your email',
            newPasswordSubtitle: 'Create a new password for your account',
            completeSubtitle: 'Your password has been changed successfully.',
            otpSentSuccess: 'OTP sent to your email',
            requestFailed: 'Failed to send reset password request',
            updateSuccess: 'Password updated successfully',
            updateFailed: 'Failed to change password',
            passwordsDoNotMatch: 'Passwords do not match',
            otpResentToEmail: 'OTP resent to your email',
            resendFailed: 'Failed to resend OTP',
        },
        validation: {
            firstNameRequired: 'First name is required',
            firstNameInvalid: 'No numbers or special characters',
            lastNameRequired: 'Last name is required',
            lastNameInvalid: 'No numbers or special characters',
            emailInvalid: 'Invalid email address',
            passwordTooShort: 'Password must be at least 6 characters',
            passwordsDoNotMatch: "Passwords don't match",
            passwordRequired: 'Password is required',
            genderOtherRequired: 'Please specify your gender',
            dobInPast: 'Date of birth must be in the past',
            dobRequired: 'Please enter your birthday',
            genderRequired: 'Please select your gender',
            ageRequirement:
                'You must be at least 18 years old to create an account',
            emailRequired: 'Email is required',
            phoneNumberRequired: 'Phone number is required',
        },
    },
    validation: {
        invalidEmail: 'Invalid email address',
        passwordRequired: 'Password is required',
    },
    consultationRequest: {
        validation: {
            productNotSelected:
                'Products not selected. Please select a product!',
            contactMethodRequired: 'At least one contact method is required',
            socialNetworkRequiredWhenSelected:
                'Social network is required when selected as contact method',
        },
        ourSolution: 'Our Solutions',
        describeOurSolution:
            'Please select the solutions you would like to be consulted on.',
        yourInformation: {
            title: 'Your Information:',
            prompt: 'Please tell us about yourself.',
        },
        contactMethod: {
            prompt: 'How would you like us to contact you?',
            email: 'Email',
            phone: 'Phone',
            socialNetwork: 'Social network',
        },
        yourMessage: {
            label: 'Your message (optional)',
        },
        requestButton: 'Request A Consultation',
    },
    ourSolutions: {
        financialFoundation: {
            title: 'Financial Foundation Mentoring',
            description:
                'Are you feeling overwhelmed by financial decisions and unsure where to begin? The Financial Foundation Mentoring program at Chào Market is designed to be your starting point. This is a program where we work together to build your core financial knowledge, starting with defining your personal goals and understanding your risk tolerance. You will learn proven methodologies for asset allocation and investment analysis, not as rigid rules, but as flexible frameworks you can adapt to confidently navigate the markets and make independent financial decisions.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Interactive small group workshop',
                workshopDesc:
                    'Learn in a collaborative environment, sharing experiences with other investors.',
                mentoring: 'Intensive 1-on-1 mentoring',
                mentoringDesc:
                    'A fully personalized roadmap, focusing deeply and confidentially on your unique financial situation.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                roadmap: 'A clear financial roadmap',
                roadmapDesc:
                    'You will craft a personalized financial plan that outlines clear, actionable steps towards your long-term goals.',
                riskAssessment: 'Risk assessment skills',
                riskAssessmentDesc:
                    'Develop the ability to accurately assess your own risk tolerance and make investment choices that align with it.',
                assetKnowledge: 'Knowledge of asset classes',
                assetKnowledgeDesc:
                    'Gain a solid understanding of major asset classes (stocks, bonds, etc.) and their roles in a diversified portfolio.',
                independentDecision: 'Independent decision-making',
                independentDecisionDesc:
                    'Build the confidence and skills to make informed financial decisions on your own.',
                budgetingMastery: 'Budgeting and allocation mastery',
                budgetingMasteryDesc:
                    'Learn practical techniques for budgeting, saving, and allocating your capital effectively.',
            },
            note: 'Note: This program focuses on equipping knowledge; It does not provide specific buy/sell recommendations.',
        },
        portfolioStrategy: {
            title: 'Portfolio Strategy & Tools',
            description:
                "Building a resilient investment portfolio is both an art and a science. At Chào Market, our philosophy is that a successful portfolio requires both a solid strategy and the right tools. This service is designed for investors who manage their own assets but want to refine their strategic approach. We will guide you through the core principles of modern portfolio construction, diversification, and rebalancing. You will learn how to use our algorithm-based tools to self-monitor market trends and analyze your portfolio's performance, enabling you to make proactive, data-driven decisions.",
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Interactive small group workshop',
                workshopDesc:
                    'Master the principles in a group setting, learning from shared discussions.',
                mentoring: 'Intensive 1-on-1 mentoring',
                mentoringDesc:
                    'A deep-dive session focused entirely on your specific portfolio and strategic goals.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                framework: 'A practical construction framework',
                frameworkDesc:
                    'Gain a step-by-step framework for building and diversifying a robust investment portfolio from scratch.',
                rebalancing: 'Strategic rebalancing skills',
                rebalancingDesc:
                    'Master the skill of strategically adjusting and rebalancing your portfolio to adapt to changing market conditions.',
                toolsProficiency: 'Proficiency in analytical tools',
                toolsProficiencyDesc:
                    'Become proficient in using algorithmic tools to gain objective, data-driven insights into your investments.',
                riskManagement: 'Advanced risk management',
                riskManagementDesc:
                    'Develop a deep understanding of sophisticated risk management techniques to protect your capital.',
                objectiveDecision: 'Objective decision-making',
                objectiveDecisionDesc:
                    'Learn to separate emotions from investing and make objective decisions based on your strategy and data.',
            },
            note: 'Note: We provide the frameworks and tools; All final investment decisions are made by you.',
        },
        algoTrading: {
            title: 'Algorithmic Trading Solutions',
            description:
                'You have a unique trading strategy, but implementing it manually is inefficient. As your technical partner, Chào Market transforms your vision into a powerful, automated trading system. You are the strategist; we are the technical implementers. The process includes in-depth consultations to understand your rules, programming the logic, providing a comprehensive backtest report, and supporting you in deploying the system.',
            deliveryMethod: {
                title: 'Delivery method:',
                desc: 'To ensure confidentiality and a completely custom outcome for your proprietary strategy, this service is conducted exclusively on a one-on-one project basis.',
            },
            outcomes: {
                title: 'Key outcomes you will receive:',
                codedSystem: 'A fully coded trading system',
                codedSystemDesc:
                    'A complete and operational automated system that executes your unique strategy 24/7.',
                backtestReport: 'A comprehensive backtest report',
                backtestReportDesc:
                    "A detailed report analyzing your strategy's historical performance, providing insights into its potential strengths and weaknesses.",
                deployedTool: 'A deployed & integrated tool',
                deployedToolDesc:
                    'A system fully integrated and deployed on your chosen trading platform, ready for you to use.',
                systematicExecution: 'Systematic execution',
                systematicExecutionDesc:
                    'The ability to execute your strategy with precision and discipline, completely free from emotional interference.',
                fullOwnership: 'Full ownership and documentation',
                fullOwnershipDesc:
                    'You receive the full source code and technical documentation for your system.',
            },
            note: 'Note: This is a technical service. We provide the code, not the trading strategy itself.',
        },
        tradingPerformance: {
            title: 'Trading Performance Mentoring',
            description:
                'Are your trading results inconsistent? The Chào Market Performance Deep-Dive is our mentoring service designed to find the answers in your own trading data. We perform a deep analysis of your trading history, transforming raw data into actionable insights. We use statistical analysis to generate visual reports that highlight your performance metrics and behavioral patterns. The goal is to foster powerful self-awareness, enabling you to refine your risk management skills and improve your trading discipline objectively.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Group workshop',
                workshopDesc:
                    'Learn performance analysis methods through anonymized case studies and group discussions.',
                mentoring: '1-on-1 mentoring',
                mentoringDesc:
                    'A deep and confidential analysis of your personal trading history, providing private, specific feedback.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                performanceView: 'A clear view of your performance',
                performanceViewDesc:
                    'A deep understanding of your key performance metrics (win rate, risk/reward, max drawdown, etc.).',
                behavioralPatterns: 'Identification of behavioral patterns',
                behavioralPatternsDesc:
                    'The ability to identify and analyze your recurring psychological biases and behavioral patterns (e.g., cutting winners short).',
                improvementPlan: 'An actionable improvement plan',
                improvementPlanDesc:
                    'A concrete plan with specific, actionable steps to enhance your discipline and refine your risk management rules.',
                selfReviewSkills: 'Objective self-review skills',
                selfReviewSkillsDesc:
                    'The skill of objectively reviewing your own trading journal and data to continuously improve in the future.',
                tradingDiscipline: 'Enhanced trading discipline',
                tradingDisciplineDesc:
                    'Increased control and objectivity in your trading process, leading to more consistent execution.',
            },
            note: 'Note: This program helps you self-evaluate; It does not provide direct buy/sell trading advice.',
        },
        financialCourse: {
            title: 'Financial Investment Courses',
            description:
                'In a world of information overload, finding a trusted source of knowledge is key. The Financial Investment Course at Chào Market is designed to systematically build your expertise, from the ground up. We start with the core foundations of financial markets and asset types, then move into practical analysis methods and proven investment strategies. A key focus of the course is the hands-on application of modern algorithmic tools, empowering you to make smarter, data-driven decisions.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                groupClass: 'Small group class',
                groupClassDesc:
                    'Join a community of learners to benefit from group discussions and interactive Q&A sessions.',
                privateMentoring: 'Private 1-on-1 mentoring',
                privateMentoringDesc:
                    'A customized learning experience where the curriculum is tailored to your knowledge level.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                foundationalKnowledge: 'Solid foundational knowledge',
                foundationalKnowledgeDesc:
                    'A comprehensive understanding of how financial markets operate, including stocks, forex, and other major asset classes.',
                analysisSkills: 'Practical analysis skills',
                analysisSkillsDesc:
                    'The ability to apply both fundamental and technical analysis methods to evaluate investment opportunities.',
                toolProficiency: 'Algorithmic tool proficiency',
                toolProficiencyDesc:
                    'Practical skills in using modern algorithmic tools to find, analyze, and support your trading ideas.',
                strategicFramework: 'A strategic framework',
                strategicFrameworkDesc:
                    'A framework for developing, backtesting, and refining your own investment strategies.',
                confidenceToInvest: 'Confidence to invest',
                confidenceToInvestDesc:
                    'The confidence to navigate the investment world with a structured, knowledgeable, and disciplined approach.',
            },
            note: 'Note: All content is for educational purposes only and is not investment advice.',
        },
        common: {
            getStarted: 'Get Started',
            title: 'Chào Solutions',
        },
    },
    sidebar: {
        home: 'Home',
        performanceStatistics: 'Performance Statistics',
        marketData: 'Market Data',
        ourSolutions: 'Chào Solutions',
        newsEvents: 'Chào Insights',
        news: 'News',
        events: 'Events',
        community: 'Community',
        marketInsights: 'Chào Insights',
        freeCourses: 'Free Courses',
        conferences: 'Conferences',
        videos: 'Videos',
        images: 'Images',
        membersOnly: 'Members Only',
        brandGoal: 'Manage Your Risk',
    },
    bookConsultation: {
        bookConsultation: 'Book A Consultation',
    },
    contactButton: {
        quickContactTooltip: 'Chat with Chào Market',
        methods: {
            messenger: 'Chat on Messenger',
            zalo: 'Chat on Zalo',
            telegram: 'Chat on Telegram',
            callUs: 'Call Chào Market',
        },
    },
    footer: {
        aboutUs: {
            title: 'About Us',
            sections: [
                {
                    title: 'Our Mission: Empowering Vietnamese Investors',
                    content: [
                        "Welcome to Chào Market. We believe that successful financial navigation in today's complex markets is not about secrets or luck, but about having the right knowledge, the right strategy, and the right tools. Our mission is to empower Vietnamese investors by demystifying the world of finance and providing data-driven, educational solutions.",
                    ],
                },
                {
                    title: 'Our Approach: A Blend of Expertise and Technology',
                    content: [
                        'Founded on the principle of education first, Chào Market combines deep financial expertise with modern technology. We don\'t offer "get-rich-quick" schemes; instead, we provide a structured path to building financial literacy and strategic thinking. Our programs, from foundational mentoring to advanced system development, are designed to equip you with the skills to make your own informed, confident decisions.',
                        'We are your partners in managing risk and turning market data into successful financial outcomes.',
                    ],
                },
            ],
        },
        termOfUse: {
            title: 'Terms of Use',
            sections: [
                {
                    title: '1. Acceptance of Terms',
                    content:
                        'By accessing, using, and/or registering for an account on the Chào Market website (the "website"), you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions set forth in these "Terms of Use". <strong>If you do not agree, please do not use our website.</strong>',
                },
                {
                    title: '2. Description of Services',
                    content:
                        'Chào Market provides services, tools, and information for financial education purposes, including but not limited to: <strong>Financial Foundation Mentoring, Portfolio Strategy & Tools, Algorithmic Trading Solutions, Trading Performance Mentoring, and Financial Investment Courses.</strong>',
                },
                {
                    title: '3. User Account and Responsibilities',
                    content:
                        'To access certain features, including the "Performance Statistics" area, you will be' +
                        ' required to create an account. By creating an account, you agree to:\n• Provide accurate' +
                        ' and current information.\n• Maintain the confidentiality of your password and be' +
                        ' responsible for all activities that occur under your account.\n• Acknowledge that the act' +
                        ' of checking the box stating "By creating an account, I confirm that I am <a href="/terms-of-use">at' +
                        ' least' +
                        ' 18 years old</a> and I agree to the website\'s <a href="/terms-of-use">Terms of' +
                        ' Use</a> and <a href="/privacy-policy">Privacy Policy</a> during the registration process' +
                        ' constitutes' +
                        ' a' +
                        ' legally binding electronic signature and confirms your full consent to this document.',
                },
                {
                    title: '4. Terms of Access and Use for the "Performance Statistics" Area',
                    content:
                        'The "Performance Statistics" area is restricted content, available only to registered members who have agreed to these terms. You unconditionally acknowledge and agree to the following provisions:\n\n<strong>4.1. Sole Purpose of Research and Academic Study:</strong> You acknowledge that the sole purpose for which you are permitted to access and use the data is for <strong>research, analysis, and academic study.</strong> The data is provided as case studies and illustrative examples for the educational purpose of understanding how a trading system operates.\n\n<strong>4.2. User Obligations and Prohibited Uses:</strong> Upon being granted access, you agree to:\n<strong>• Confidentiality:</strong> Not to share your login credentials or disclose, disseminate the data to any third party.\n<strong>• Purpose of Use:</strong> To use the data only for personal, non-commercial purposes as stated.\n<strong>• Prohibitions:</strong> Not to copy, modify, resell, redistribute, or use the data to create competing products, services, or for any other commercial purpose without our express written permission.\n\n<strong>4.3. Termination of Access:</strong> We reserve the full right to suspend or permanently terminate your access to the Restricted Area without prior notice if we have reason to believe that you have violated any term of this document.',
                },
                {
                    title: '5. No Investment Advice Disclaimer (critical)',
                    content:
                        'All content, tools, and services provided on this website, including all data within the restricted area, are for informational and educational purposes only. <strong>Absolutely Nothing</strong> on this website constitutes, or should be construed as, investment advice, a recommendation, a trade signal, or a solicitation to buy, sell, or hold any financial instrument. Chào Market is not a licensed investment advisor or broker-dealer under the laws of Vietnam. All investment decisions are made solely by you, and you are solely responsible for evaluating the related risks.',
                },
                {
                    title: '6. Acknowledgment of Legal Context and Specific Market Risks',
                    content:
                        'By accepting these terms, you confirm you have been informed and understand the specific legal status and risks of each market in Vietnam:\n<strong>• Regarding Currencies & Cryptocurrencies:</strong> You are aware that these markets are <strong>not licensed for individual retail investors under Vietnamese law,</strong> operate in an unclear legal environment, and carry very significant legal and financial risks. We do not encourage or broker any activities in these markets.\n<strong>• Regarding Stocks & Commodities:</strong> You understand that while these markets are licensed, they always involve the risk of volatility and potential loss.\n<strong>• General Principle:</strong> You accept that past performance, whether from backtests or live trading, <strong>does not guarantee and is not an indicator</strong> of future results.',
                },
                {
                    title: '7. Intellectual Property',
                    content:
                        'All content on this website, including text, graphics, logos, software, and <strong>data within the restricted area</strong>, is the property of Chào Market and is protected by Vietnamese and international copyright laws.',
                },
                {
                    title: '8. Limitation of Liability',
                    content:
                        'In no event shall Chào Market, its owners, or affiliates be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the information and services on this website.',
                },
                {
                    title: '9. Governing Law and Severability',
                    content:
                        '<strong>Governing Law:</strong> These terms shall be governed by and construed in accordance with the laws of Vietnam.\n<strong>Severability:</strong> If any provision of this document is found to be invalid by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.',
                },
                {
                    title: '10. Contact',
                    content:
                        'Any questions regarding these "Terms of Use" should be directed to: <a href="mailto:support@chaomarket.com">support@chaomarket.com</a>',
                },
            ],
        },
        privacyPolicy: {
            title: 'Privacy Policy',
            sections: [
                {
                    title: '1. Information We Collect',
                    content:
                        'Chào Market ("we," "us," or "our") is committed to protecting the privacy of our users' +
                        ' ("you"). This “Privacy Policy” explains how we collect, use, disclose, and safeguard your' +
                        ' information when you visit our website Chào Market (chaomarket.com) and use our' +
                        ' services.\nWe may collect information about you in a variety of' +
                        ' ways:\n\n<strong>Personal data you provide to us:</strong>\n• When you register for an account, we collect personally identifiable information such as your <strong>name, email address, and optional phone number.</strong>\n• When you contact us via forms or email, we collect the information you provide during that communication.\n\n<strong>Data collected automatically:</strong>\n• When you access the website, we may automatically collect information such as your <strong>IP address, browser type, operating system, access times, and the pages you have viewed.</strong> This data is used for analytics and security purposes.',
                },
                {
                    title: '2. How We Use Your Information',
                    content:
                        'Having accurate information about you permits us to provide you with an effective, secure, and customised experience. Specifically, we use your information to:\n• Create and manage your account.\n• Grant you access to restricted content (such as the "Performance Statistics" area) after you have agreed to the terms.\n• Send you important administrative emails regarding your account and our services.\n• Respond to your inquiries and questions.\n• Analyse website usage to improve our services and user experience.\n• Prevent fraudulent activities and enhance the security of our website.',
                },
                {
                    title: '3. Disclosure of Your Information',
                    content:
                        'We do not sell, rent, or trade your personal information to any third parties for marketing purposes. Your information may be shared only in the following situations:\n<strong>• With service providers:</strong> We may share your information with third-party vendors who perform services for us (such as web hosting, data analysis, and email delivery). These parties are only permitted to use your information to carry out the tasks we have assigned to them and are obligated to keep it confidential.\n<strong>• By law or to protect rights:</strong> We may disclose your information if required by law, court order, or a government request to protect the rights, property, and safety of ourselves and others.',
                },
                {
                    title: '4. Security of Your Information',
                    content:
                        'We use reasonable administrative, technical, and physical security measures to help protect your personal information. Data is encrypted in transit (using SSL). However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee 100% security.',
                },
                {
                    title: '5. Cookie Policy',
                    content:
                        "We use cookies to maintain your session, remember your preferences, and analyse traffic. You can control the use of cookies through your browser's settings.",
                },
                {
                    title: '6. Changes to This Policy',
                    content:
                        'We may update this “Privacy Policy” at any time. Any changes will be effective immediately upon posting the updated version on the website. We will notify you of any significant changes via email or a prominent notice on the website.',
                },
                {
                    title: '7. Contact Us',
                    content:
                        'If you have any questions or concerns about this “Privacy Policy”, please contact us at: <a href="mailto:support@chaomarket.com">support@chaomarket.com</a>.',
                },
            ],
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            sections: [
                {
                    title: '1. What Are Cookies?',
                    content:
                        'Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work more efficiently and to provide information to the site owners.',
                },
                {
                    title: '2. How We Use Cookies',
                    content:
                        '<strong>Essential Cookies:</strong> Necessary for the website to function' +
                        ' properly.<br/><strong>Analytics' +
                        ' Cookies:</strong>' +
                        ' We' +
                        ' use these (e.g., Google Analytics) to understand how visitors interact with our website,' +
                        ' which helps us improve our content and services.<br/><strong>Marketing Cookies (if' +
                        ' applicable):</strong>' +
                        ' These are used to track visitors across websites to display relevant ads.',
                },
                {
                    title: '3. Your Choices',
                    content:
                        "You can control and manage cookies in various ways. Please refer to your browser's help section for information on how to block or delete cookies.",
                },
            ],
        },
        getToKnowUs: 'Get to know us',
        followUs: 'Follow us',
        joinGroup: 'Join Group',
        copyright:
            '© 2025 Chaomarket.com. All rights reserved. All content on this website is protected by intellectual' +
            ' property laws. <br/>Unauthorized copying, reproduction, or distribution of any material is strictly' +
            ' prohibited.',
    },
    marketData: {
        marketData: {
            title: 'Market Data',
            items: {
                indices: {
                    title: 'Indices',
                    items: {
                        global: { title: 'Global' },
                        us: { title: 'The United States' },
                        vietnam: { title: 'Vietnam' },
                    },
                },
                markets: {
                    title: 'Markets',
                    items: {
                        usStocks: {
                            title: 'US Stocks',
                            items: {
                                overview: { title: 'Overview' },
                                heatmap: { title: 'Heatmap' },
                                chart: { title: 'Chart' },
                                news: { title: 'News' },
                                calendar: { title: 'Calendar' },
                            },
                        },
                        vietnamStocks: { title: 'Vietnam Stocks' },
                        currencies: { title: 'Currencies' },
                        cryptocurrencies: { title: 'Cryptocurrencies' },
                        commodities: { title: 'Commodities' },
                    },
                },
                financialNews: {
                    title: 'Financial News',
                },
                economicCalendar: {
                    title: 'Economic Calendar',
                },
                chaoInsights: {
                    title: 'Chào Insights',
                },
            },
        },
    },
    investors: {
        title: 'Chào & Investors',
        items: {
            chaoAnnoucement: {
                title: 'Chào Announcements',
            },
            chaoSocial: {
                title: 'Chào Social',
                items: {
                    facebook: { title: 'Facebook' },
                    tiktok: { title: 'Tiktok' },
                    threads: { title: 'Threads' },
                    youtube: { title: 'Youtube' },
                },
            },
            toolForInvestor: {
                title: 'Tools For Investors',
                items: {
                    currencyConverterCalc: {
                        title: 'Currency Converter Calculator',
                        description:
                            'A tool to convert values between currency pairs.',
                    },
                    pipCalculator: {
                        title: 'Pip Calculator',
                        description:
                            'A tool to calculate pip values for currency pairs.',
                    },
                    profitCalculator: {
                        title: 'Profit Calculator',
                        description:
                            'A tool to determine profit and loss in trades.',
                    },
                    pivotalCalculator: {
                        title: 'Pivot Point Calculator',
                        description:
                            'A tool to find support and resistance pivot points in technical analysis.',
                    },
                    fiboCalculator: {
                        title: 'Fibonacci Calculator',
                        description:
                            'A tool to calculate Fibonacci retracement and extension levels.',
                    },
                    marginCalculator: {
                        title: 'Margin Calculator',
                        description:
                            'A tool to determine the required margin for trading positions.',
                    },
                    investmentCalculator: {
                        title: 'Interest Calculator',
                        description:
                            'Calculate investment returns and future value of investments.',
                    },
                },
            },
        },
    },
    community: {
        title: 'Community',
        items: {
            chaoConnect: {
                title: 'Chào Connect',
            },
            freeCourses: {
                title: 'Free Courses',
            },
            workShops: {
                title: 'Workshops',
            },
        },
    },
    account: {
        profile: 'Profile',
        notification: 'Notifications',
        title: 'Account',
        notificationSection: {
            title: 'Notification Preferences',
            recentNotification: 'Recent Notifications',
        },
    },
    tool: {
        valueIsNowEmpty: 'Value is now empty',
    },
    disclaimer: {
        title: 'Disclaimer',
        sections: [
            {
                title: 'Informational Purposes',
                content:
                    'All information, tools, and data provided by Chào Market are for <strong>general informational and educational purposes only</strong> and are not intended as advisory services.',
            },
            {
                title: 'No Investment Advice',
                content:
                    'The content on this website <strong>absolutely does not</strong> constitute and shall not be considered as investment advice, a recommendation, a trade signal, or a solicitation to buy, sell, or hold any financial instrument. We do not guarantee the accuracy or completeness of this information.',
            },
            {
                title: 'Risk And Responsibility',
                content:
                    'All investment decisions carry significant financial risks. <strong>Past performance is not indicative of future results.</strong> You are solely responsible for your own decisions and are encouraged to seek independent professional financial advice before making any investment.',
            },
        ],
        conclusion:
            '<strong>By continuing to access this website, you agree that the information provided is for' +
            ' educational and informational purposes only. This does not constitute investment advice, and we are' +
            ' not responsible for your decisions. Please read our <a href="/terms-of-use">Terms of Use</a> and' +
            ' <a href="/privacy-policy">Privacy Policy</a>' +
            ' carefully.</strong>',
        agreeButton: 'I understand and agree',
        alreadyAgreeButton: 'You have already accepted this disclaimer.',
        leaveButton: 'Leave site',
        triggerDialogContent: 'Disclaimer',
    },
    performanceNotice: {
        guest: {
            title: 'Members Only Area',
            desc1:
                'This area contains in-depth analysis and research data, exclusively for registered members who' +
                ' are <a href="/terms-of-use">at least 18 years of age</a> and have agreed to our <a' +
                ' href="/terms-of-use">Terms of Use</a> and' +
                ' <a href="/privacy-policy">Privacy Policy</a> .',
            desc2: '',
            linkSignUp: 'Sign Up',
            desc3: ' or ',
            linkLogIn: 'Log In',
            desc4: ' to continue.',
            okButton: 'I understand and agree',
        },
        member: {
            title: 'Important Data Notice',
            reminderText: 'Important Data Notice',
            desc1: 'The data you are viewing is for',
            desc2: 'research and academic purposes only and does not constitute investment advice',
            desc3:
                '. Past performance is no guarantee of future results.' +
                '<br/>By continuing, you confirm that you are a registered member, are <a href="/terms-of-use">18 years' +
                ' or' +
                ' older</a>,' +
                ' and agree' +
                ' to' +
                ' our <a href="/terms-of-use">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.',
            linkTerms: 'Terms of Use',
            agreeButton: 'I understand and agree',
            alreadyAgreeButton:
                'You accepted this notice when you registered your account',
        },
        mainSection: {
            independentVerification: 'Independent Verification',
        },
    },
    helpAndFeedback: {
        title: "We're here to help!",
        desc:
            'For website-related issues, bug reports, or detailed feedback, please send an email to <a' +
            " href='mailto:support@chaomarket.com'>support@chaomarket.com.</a>\n" +
            '<br/>For quick assistance, please click the <strong>"Chat with Chào Market"</strong> button in the' +
            ' bottom right corner of your' +
            ' screen.',
        endContent:
            '<strong>Thank you for your feedback and for choosing Chào Market !</strong>',
    },
    brandSlogan: {
        general: 'We prioritise helping you <br /> manage market risks',
        clientPromise: `“We don’t focus on maximising your profit. <br />We prioritise helping you manage market risks.”`,
        auth: `We prioritise helping you<br />manage market risks.`,
    },
    lossRecovery: {
        title: 'Break-even Point Calculator',
        description:
            'A tool to estimate the time and effort required to recover from a loss.',
    },
    cart: {
        title: 'Selected Services',
        empty: {
            title: 'Your cart is empty',
            description: "Looks like you haven't added any services yet.",
            button: 'Browse Services',
        },
        itemType: 'One-time Service',
        subtotal: 'Subtotal',
        checkout: 'Proceed to Checkout',
        secureNotice: 'Secure Payment with encrypted data protection.',
    },
    resources: {
        title: 'My Purchased',
        purchasedOn: 'Purchased on',
        accessLink: 'Open Google Drive',
        empty: {
            title: 'No Resources Found',
            description: "You haven't purchased any modular solutions yet.",
            button: 'Browse Solutions',
        },
    },
};
