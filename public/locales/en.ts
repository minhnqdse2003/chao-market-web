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
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        confirmPassword: 'Confirm Password',
        dateOfBirth: 'Date of Birth',
        gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other',
            selfDescribe: 'Prefer to self-describe',
        },
        back: 'Back',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        sending: 'Sending...',
        phoneNumber: 'Phone Number (optional)',
        backToSignUp: '← Back to Sign Up',
        lastUpdated: 'Last updated: {date}',
        backToHome: '← Back to Home',
        scrollToTop: 'Back To Top',
    },
    auth: {
        login: 'Log In',
        signup: 'Sign Up',
        forgotPassword: 'Forgot Password?',
        otpSentToEmail: 'We\'ve sent a verification code to',
        otpVerificationFailed: 'OTP verification failed',
        failedToVerifyOtp: 'Failed to verify OTP',
        welcomeBack: 'Hello there! Welcome back.',
        invalidCredentials: 'Invalid credentials',
        loginError: 'An error occurred during login',
        signInError: 'An error occurred during sign in',
        noAccountPrompt: 'Don\'t have an account?',
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
        otpResentSuccess: 'Verification code resent successfully!',
        failedToResendOtp: 'Failed to resend verification code',
        didNotReceiveCode: 'I didn\'t receive a code',
        resendOtp: 'Resend OTP',
        termsAgreement: {
            start: 'By creating an account, I confirm I am at least 18 years old and',
            startNewLine: 'I agree to the website\'s',
            privacyNotice: 'Privacy Policy',
            and: 'and',
            termsOfUse: 'Term of Use',
        },
        termsNotAccepted: 'You must agree to the Terms of Use and Privacy Policy to create an account.',
        resetPassword: {
            goToLogin: 'Go to Login',
            sendResetCode: 'Send Reset Code',
            updatePassword: 'Update Password',
            rememberPassword: 'Remember your password?',
            title: 'Reset your password',
            setNewPasswordTitle: 'Set new password',
            completeTitle: 'Successfully !',
            emailSubtitle: 'You will receive an email to reset your password in a few minutes.',
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
            passwordsDoNotMatch: 'Passwords don\'t match',
            genderOtherRequired: 'Please specify your gender',
            dobInPast: 'Date of birth must be in the past',
            dobRequired: 'Please enter your date of birth',
            genderRequired: 'Please select your gender',
            ageRequirement: 'You must be at least 18 years old to create an account',
        },
    },
    validation: {
        invalidEmail: 'Invalid email address',
        passwordRequired: 'Password is required',
    },
    consultationRequest: {
        validation: {
            productNotSelected: 'Products not selected. Please select a product!',
        },
    },
    ourSolutions: {
        financialFoundation: {
            title: 'Financial Foundation Mentoring',
            description: 'Are you feeling overwhelmed by financial decisions and unsure where to begin? The Financial Foundation Mentoring program at Chào Market is designed to be your starting point. This is a program where we work together to build your core financial knowledge, starting with defining your personal goals and understanding your risk tolerance. You will learn proven methodologies for asset allocation and investment analysis, not as rigid rules, but as flexible frameworks you can adapt to confidently navigate the markets and make independent financial decisions.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Interactive small group workshop',
                workshopDesc: 'Learn in a collaborative environment, sharing experiences with other investors.',
                mentoring: 'Intensive 1-on-1 mentoring',
                mentoringDesc: 'A fully personalized roadmap, focusing deeply and confidentially on your unique financial situation.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                roadmap: 'A clear financial roadmap',
                roadmapDesc: 'You will craft a personalized financial plan that outlines clear, actionable steps towards your long-term goals.',
                riskAssessment: 'Risk assessment skills',
                riskAssessmentDesc: 'Develop the ability to accurately assess your own risk tolerance and make investment choices that align with it.',
                assetKnowledge: 'Knowledge of asset classes',
                assetKnowledgeDesc: 'Gain a solid understanding of major asset classes (stocks, bonds, etc.) and their roles in a diversified portfolio.',
                independentDecision: 'Independent decision-making',
                independentDecisionDesc: 'Build the confidence and skills to make informed financial decisions on your own.',
                budgetingMastery: 'Budgeting and allocation mastery',
                budgetingMasteryDesc: 'Learn practical techniques for budgeting, saving, and allocating your capital effectively.',
            },
            note: 'Note: This program focuses on equipping knowledge; It does not provide specific buy/sell recommendations.',
        },
        portfolioStrategy: {
            title: 'Portfolio Strategy & Tools',
            description: 'Building a resilient investment portfolio is both an art and a science. At Chào Market, our philosophy is that a successful portfolio requires both a solid strategy and the right tools. This service is designed for investors who manage their own assets but want to refine their strategic approach. We will guide you through the core principles of modern portfolio construction, diversification, and rebalancing. You will learn how to use our algorithm-based tools to self-monitor market trends and analyze your portfolio\'s performance, enabling you to make proactive, data-driven decisions.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Interactive small group workshop',
                workshopDesc: 'Master the principles in a group setting, learning from shared discussions.',
                mentoring: 'Intensive 1-on-1 mentoring',
                mentoringDesc: 'A deep-dive session focused entirely on your specific portfolio and strategic goals.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                framework: 'A practical construction framework',
                frameworkDesc: 'Gain a step-by-step framework for building and diversifying a robust investment portfolio from scratch.',
                rebalancing: 'Strategic rebalancing skills',
                rebalancingDesc: 'Master the skill of strategically adjusting and rebalancing your portfolio to adapt to changing market conditions.',
                toolsProficiency: 'Proficiency in analytical tools',
                toolsProficiencyDesc: 'Become proficient in using algorithmic tools to gain objective, data-driven insights into your investments.',
                riskManagement: 'Advanced risk management',
                riskManagementDesc: 'Develop a deep understanding of sophisticated risk management techniques to protect your capital.',
                objectiveDecision: 'Objective decision-making',
                objectiveDecisionDesc: 'Learn to separate emotions from investing and make objective decisions based on your strategy and data.',
            },
            note: 'Note: We provide the frameworks and tools; All final investment decisions are made by you.',
        },
        algoTrading: {
            title: 'Algorithmic Trading Solutions',
            description: 'You have a unique trading strategy, but implementing it manually is inefficient. As your technical partner, Chào Market transforms your vision into a powerful, automated trading system. You are the strategist; we are the technical implementers. The process includes in-depth consultations to understand your rules, programming the logic, providing a comprehensive backtest report, and supporting you in deploying the system.',
            deliveryMethod: {
                title: 'Delivery method:',
                desc: 'To ensure confidentiality and a completely custom outcome for your proprietary strategy, this service is conducted exclusively on a one-on-one project basis.',
            },
            outcomes: {
                title: 'Key outcomes you will receive:',
                codedSystem: 'A fully coded trading system',
                codedSystemDesc: 'A complete and operational automated system that executes your unique strategy 24/7.',
                backtestReport: 'A comprehensive backtest report',
                backtestReportDesc: 'A detailed report analyzing your strategy\'s historical performance, providing insights into its potential strengths and weaknesses.',
                deployedTool: 'A deployed & integrated tool',
                deployedToolDesc: 'A system fully integrated and deployed on your chosen trading platform, ready for you to use.',
                systematicExecution: 'Systematic execution',
                systematicExecutionDesc: 'The ability to execute your strategy with precision and discipline, completely free from emotional interference.',
                fullOwnership: 'Full ownership and documentation',
                fullOwnershipDesc: 'You receive the full source code and technical documentation for your system.',
            },
            note: 'Note: This is a technical service. We provide the code, not the trading strategy itself.',
        },
        tradingPerformance: {
            title: 'Trading Performance Mentoring',
            description: 'Are your trading results inconsistent? The Chào Market Performance Deep-Dive is our mentoring service designed to find the answers in your own trading data. We perform a deep analysis of your trading history, transforming raw data into actionable insights. We use statistical analysis to generate visual reports that highlight your performance metrics and behavioral patterns. The goal is to foster powerful self-awareness, enabling you to refine your risk management skills and improve your trading discipline objectively.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                workshop: 'Group workshop',
                workshopDesc: 'Learn performance analysis methods through anonymized case studies and group discussions.',
                mentoring: '1-on-1 mentoring',
                mentoringDesc: 'A deep and confidential analysis of your personal trading history, providing private, specific feedback.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                performanceView: 'A clear view of your performance',
                performanceViewDesc: 'A deep understanding of your key performance metrics (win rate, risk/reward, max drawdown, etc.).',
                behavioralPatterns: 'Identification of behavioral patterns',
                behavioralPatternsDesc: 'The ability to identify and analyze your recurring psychological biases and behavioral patterns (e.g., cutting winners short).',
                improvementPlan: 'An actionable improvement plan',
                improvementPlanDesc: 'A concrete plan with specific, actionable steps to enhance your discipline and refine your risk management rules.',
                selfReviewSkills: 'Objective self-review skills',
                selfReviewSkillsDesc: 'The skill of objectively reviewing your own trading journal and data to continuously improve in the future.',
                tradingDiscipline: 'Enhanced trading discipline',
                tradingDisciplineDesc: 'Increased control and objectivity in your trading process, leading to more consistent execution.',
            },
            note: 'Note: This program helps you self-evaluate; It does not provide direct buy/sell trading advice.',
        },
        financialCourse: {
            title: 'Financial Investment Courses',
            description: 'In a world of information overload, finding a trusted source of knowledge is key. The Financial Investment Course at Chào Market is designed to systematically build your expertise, from the ground up. We start with the core foundations of financial markets and asset types, then move into practical analysis methods and proven investment strategies. A key focus of the course is the hands-on application of modern algorithmic tools, empowering you to make smarter, data-driven decisions.',
            deliveryOptions: {
                title: 'Delivery options (to suit your needs):',
                groupClass: 'Small group class',
                groupClassDesc: 'Join a community of learners to benefit from group discussions and interactive Q&A sessions.',
                privateMentoring: 'Private 1-on-1 mentoring',
                privateMentoringDesc: 'A customized learning experience where the curriculum is tailored to your knowledge level.',
            },
            outcomes: {
                title: 'Key outcomes you will achieve:',
                foundationalKnowledge: 'Solid foundational knowledge',
                foundationalKnowledgeDesc: 'A comprehensive understanding of how financial markets operate, including stocks, forex, and other major asset classes.',
                analysisSkills: 'Practical analysis skills',
                analysisSkillsDesc: 'The ability to apply both fundamental and technical analysis methods to evaluate investment opportunities.',
                toolProficiency: 'Algorithmic tool proficiency',
                toolProficiencyDesc: 'Practical skills in using modern algorithmic tools to find, analyze, and support your trading ideas.',
                strategicFramework: 'A strategic framework',
                strategicFrameworkDesc: 'A framework for developing, backtesting, and refining your own investment strategies.',
                confidenceToInvest: 'Confidence to invest',
                confidenceToInvestDesc: 'The confidence to navigate the investment world with a structured, knowledgeable, and disciplined approach.',
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
        marketData: 'Market Data',
        clientsAccounts: 'Client Accounts',
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
                        'Welcome to Chào Market. We believe that successful financial navigation in today\'s complex markets is not about secrets or luck, but about having the right knowledge, the right strategy, and the right tools. Our mission is to empower Vietnamese investors by demystifying the world of finance and providing data-driven, educational solutions.',
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
            title: 'Term of Use',
            sections: [
                {
                    title: '1. Acceptance of Terms',
                    content: 'By accessing and using the Chào Market website, you accept and agree to be bound by these terms of use. If you do not agree to these terms, please do not use our services.',
                },
                {
                    title: '2. Description of Services',
                    content: 'Chào Market provides financial education, coaching, tools, and market information, including services such as Financial Foundation Mentoring, Portfolio Strategy & Tools, Algorithmic Trading System Development, Trading Performance Mentoring, and the Financial Investment Course.',
                },
                {
                    title: '3. No Investment Advice Disclaimer (CRITICAL)',
                    content: 'All content, tools, and services provided on this website are for informational and educational purposes only. Nothing on this website constitutes, or should be construed as, investment advice, a recommendation, or a solicitation to buy or sell any security or financial instrument. Chào Market is not a licensed investment advisor or a broker-dealer. All investment decisions are made solely by you, and you are solely responsible for evaluating the merits and risks associated with the use of any information provided.',
                },
                {
                    title: '4. Intellectual Property',
                    content: 'All content on this site, including text, graphics, logos, and software, is the property of Chào Market and is protected by Vietnamese and international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.',
                },
                {
                    title: '5. Limitation of Liability',
                    content: 'Chào Market will not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the information and services on this site. Past performance is not indicative of future results.',
                },
                {
                    title: '6. Governing Law',
                    content: 'These terms shall be governed by and construed in accordance with the laws of Vietnam.',
                },
            ],
        },
        privacyPolicy: {
            title: 'Privacy Policy',
            sections: [
                {
                    title: '1. Data We Collect',
                    content: 'We collect personal information you provide to us directly, such as your name, email address, and phone number when you fill out a consultation request form. We also collect non-personal data automatically, such as your IP address and browsing behavior, through cookies.',
                },
                {
                    title: '2. How We Use Your Data',
                    content: 'Your data is used to:\n• Respond to your inquiries and provide you with the requested services.\n• Improve our website and user experience.\n• Send you marketing communications, such as newsletters, only if you have explicitly consented (opted-in).',
                },
                {
                    title: '3. Data Sharing',
                    content: 'We do not sell, trade, or rent your personal information to others. We may share your data with trusted third-party service providers (e.g., Google Analytics, email marketing platforms) who assist us in operating our website, but only for the purposes stated above.',
                },
                {
                    title: '4. Your Rights',
                    content: 'You have the right to access, correct, or request the deletion of your personal data. Please contact us to exercise these rights.',
                },
                {
                    title: '5. Data Security',
                    content: 'We implement a variety of security measures to maintain the safety of your personal information.',
                },
            ],
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            sections: [
                {
                    title: '1. What Are Cookies?',
                    content: 'Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work more efficiently and to provide information to the site owners.',
                },
                {
                    title: '2. How We Use Cookies',
                    content: 'Essential Cookies: Necessary for the website to function properly.\nAnalytics Cookies: We use these (e.g., Google Analytics) to understand how visitors interact with our website, which helps us improve our content and services.\nMarketing Cookies (if applicable): These are used to track visitors across websites to display relevant ads.',
                },
                {
                    title: '3. Your Choices',
                    content: 'You can control and manage cookies in various ways. Please refer to your browser\'s help section for information on how to block or delete cookies.',
                },
            ],
        },
    },
    marketData: {
        'marketData': {
            'title': 'Market Data',
            'items': {
                'indices': {
                    'title': 'Indices',
                    'items': {
                        'global': { 'title': 'Global' },
                        'us': { 'title': 'The United States' },
                        'vietnam': { 'title': 'Vietnam' },
                    },
                },
                'markets': {
                    'title': 'Markets',
                    'items': {
                        'usStocks': {
                            'title': 'US Stocks',
                            'items': {
                                'overview': { 'title': 'Overview' },
                                'heatmap': { 'title': 'Heatmap' },
                                'chart': { 'title': 'Chart' },
                                'news': { 'title': 'News' },
                                'calendar': { 'title': 'Calendar' },
                            },
                        },
                        'vietnamStocks': { 'title': 'Vietnam Stocks' },
                        'currencies': { 'title': 'Currencies' },
                        'cryptocurrencies': { 'title': 'Cryptocurrencies' },
                        'commodities': { 'title': 'Commodities' },
                    },
                },
                'financialNews': {
                    'title': 'Financial News',
                },
                'economicCalendar': {
                    'title': 'Economic Calendar',
                },
                'chaoInsights': {
                    'title': 'Chào Insights',
                },
            },
        },
    },
    investors: {
        'title': 'Chào & Investors',
        'items': {
            'chaoAnnoucement': {
                'title': 'Chào Announcements',
            },
            'chaoSocial': {
                'title': 'Chào Social',
                'items': {
                    'facebook': { 'title': 'Facebook' },
                    'tiktok': { 'title': 'Tiktok' },
                    'threads': { 'title': 'Threads' },
                    'youtube': { 'title': 'Youtube' },
                },
            },
            'toolForInvestor': {
                'title': 'Tools For Investors',
                'items': {
                    'currencyConverterCalc': {
                        'title': 'Currency Converter Calculator',
                        'description': 'Use this real-time currency converter calculator to convert one currency to another.',
                    },
                    'pipCalculator': {
                        'title': 'Pip Calculator',
                        'description': 'Calculate pip values for currency pairs in forex trading.',
                    },
                    'profitCalculator': {
                        'title': 'Profit Calculator',
                        'description': 'Calculate profit and loss in investment trades.',
                    },
                    'pivotalCalculator': {
                        'title': 'Pivot Point Calculator',
                        'description': 'Calculate pivot points for support and resistance levels in technical analysis.',
                    },
                    'fiboCalculator': {
                        'title': 'Fibonacci Calculator',
                        'description': 'Calculate Fibonacci retracement and extension levels.',
                    },
                    'marginCalculator': {
                        'title': 'Margin Calculator',
                        'description': 'Calculate the required margin for trading positions.',
                    },
                    'investmentCalculator': {
                        'title': 'Interest Calculator',
                        'description': 'Calculate investment returns and future value of investments.',
                    },
                },
            },
        },
    },
    community: {
        'title': 'Community',
        'items': {
            'chaoConnect': {
                'title': 'Chào Connect',
            },
            'freeCourses': {
                'title': 'Free Courses',
            },
            'workShops': {
                'title': 'Workshops',
            },
        },
    },
    account: {
        profile: 'Profile',
        notification: 'Notification',
    },
    tool: {
        valueIsNowEmpty: 'Value is now empty',
    },
};