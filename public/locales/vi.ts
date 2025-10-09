import { TranslationsStructure } from '@/types/translations';

export const vi: TranslationsStructure = {
    common: {
        save: 'Lưu',
        cancel: 'Hủy',
        loading: 'Đang tải...',
        continue: 'Tiếp tục',
        email: 'Email',
        password: 'Mật khẩu',
        orContinueWith: 'Hoặc tiếp tục với',
        firstName: 'Tên',
        lastName: 'Họ',
        emailAddress: 'Địa chỉ Email',
        confirmPassword: 'Xác nhận Mật khẩu',
        dateOfBirth: 'Ngày sinh',
        gender: {
            male: 'Nam',
            female: 'Nữ',
            other: 'Khác',
            selfDescribe: 'Tùy chọn khác',
        },
        back: 'Quay lại',
        newPassword: 'Mật khẩu mới',
        confirmNewPassword: 'Xác nhận mật khẩu mới',
        sending: 'Đang gửi...',
        phoneNumber: 'Số Điện Thoại (tùy chọn)',
        backToSignUp: '← Quay lại trang Đăng ký',
        lastUpdated: 'Cập nhật lần cuối: {date}',
        backToHome: '← Quay lại Trang chủ',
        scrollToTop: 'Về Đầu Trang ',
    },
    auth: {
        login: 'Đăng nhập',
        signup: 'Đăng ký',
        forgotPassword: 'Quên mật khẩu?',
        otpSentToEmail: 'Chúng tôi đã gửi mã xác minh đến',
        otpVerificationFailed: 'Xác minh OTP thất bại',
        failedToVerifyOtp: 'Không thể xác minh OTP',
        welcomeBack: 'Xin chào! Chào mừng bạn quay trở lại.',
        invalidCredentials: 'Thông tin đăng nhập không hợp lệ',
        loginError: 'Đã xảy ra lỗi trong quá trình đăng nhập',
        signInError: 'Đã xảy ra lỗi trong quá trình đăng nhập',
        noAccountPrompt: 'Chưa có tài khoản?',
        oauth: {
            unknownError: 'Đã xảy ra lỗi không xác định.',
            accountNotLinked:
                'Email này đã được liên kết với một phương thức đăng nhập khác.',
            accessDenied: 'Quyền truy cập bị từ chối.',
        },
        createAccountTitle: 'Tạo tài khoản của bạn.',
        signupSuccessMessage:
            'Tài khoản đã được tạo thành công! Vui lòng xác minh email của bạn.',
        registrationFailed: 'Đăng ký thất bại',
        registrationError: 'Đã xảy ra lỗi trong quá trình đăng ký',
        failedToSendOtp: 'Gửi mã xác minh thất bại',
        alreadyHaveAccount: 'Đã có tài khoản?',
        verifyEmailTitle: 'Xác minh email của bạn',
        otpResentSuccess: 'Đã gửi lại mã xác minh thành công!',
        failedToResendOtp: 'Gửi lại mã xác minh thất bại',
        didNotReceiveCode: 'Tôi không nhận được mã',
        resendOtp: 'Gửi lại OTP',
        termsAgreement: {
            start: 'Bằng việc tạo tài khoản, tôi đồng ý với',
            privacyNotice: 'Chính sách Quyền riêng tư',
            and: 'và',
            termsOfUse: 'Điều khoản Sử dụng',
        },
        termsNotAccepted: 'Bạn phải đồng ý với Điều khoản Sử dụng và Chính sách Quyền riêng tư để tạo tài khoản.',
        resetPassword: {
            goToLogin: 'Đến trang Đăng nhập',
            sendResetCode: 'Gửi mã đặt lại',
            updatePassword: 'Cập nhật Mật khẩu',
            rememberPassword: 'Bạn nhớ mật khẩu của mình?',
            title: 'Đặt lại mật khẩu của bạn',
            setNewPasswordTitle: 'Đặt mật khẩu mới',
            completeTitle: 'Thành công!',
            emailSubtitle: 'Bạn sẽ nhận được email để đặt lại mật khẩu trong vài phút.',
            otpSubtitle: 'Nhập mã gồm 6 chữ số được gửi đến email của bạn',
            newPasswordSubtitle: 'Tạo một mật khẩu mới cho tài khoản của bạn',
            completeSubtitle: 'Mật khẩu của bạn đã được thay đổi thành công.',
            otpSentSuccess: 'OTP đã được gửi đến email của bạn',
            requestFailed: 'Không thể gửi yêu cầu đặt lại mật khẩu',
            updateSuccess: 'Mật khẩu đã được cập nhật thành công',
            updateFailed: 'Không thể thay đổi mật khẩu',
            passwordsDoNotMatch: 'Mật khẩu không khớp',
            otpResentToEmail: 'OTP đã được gửi lại đến email của bạn',
            resendFailed: 'Gửi lại OTP thất bại',
        },
    },
    validation: {
        invalidEmail: 'Địa chỉ email không hợp lệ',
        passwordRequired: 'Mật khẩu là bắt buộc',
    },
    consultationRequest: {
        validation: {
            productNotSelected: 'Chưa chọn sản phẩm. Vui lòng chọn sản phẩm!',
        },
    },
    ourSolutions: {
        financialFoundation: {
            title: 'Cố Vấn Nền Tảng Tài Chính',
            description: 'Bạn cảm thấy choáng ngợp trước các quyết định tài chính và không chắc nên bắt đầu hành trình đầu tư của mình từ đâu? Chương trình Cố vấn Nền tảng Tài chính tại Chào Market được thiết kế để là điểm khởi đầu cho bạn. Đây là một chương trình mà chúng ta sẽ cùng nhau xây dựng nền tảng kiến thức cốt lõi, bắt đầu từ việc xác định mục tiêu cá nhân và thấu hiểu khẩu vị rủi ro. Bạn sẽ học các phương pháp luận đã được kiểm chứng về phân bổ tài sản và phân tích đầu tư, không phải như những quy tắc cứng nhắc, mà là các khuôn khổ linh hoạt để bạn có thể tự điều chỉnh và tự tin định hướng trên thị trường.',
            deliveryOptions: {
                title: 'Hình thức cung cấp (tùy theo nhu cầu của bạn):',
                workshop: 'Workshop nhóm nhỏ tương tác',
                workshopDesc: 'Học tập trong một môi trường hợp tác, trao đổi kinh nghiệm cùng các nhà đầu tư khác.',
                mentoring: 'Cố vấn chuyên sâu 1:1',
                mentoringDesc: 'Một lộ trình được cá nhân hóa hoàn toàn, tập trung sâu và bảo mật vào tình hình tài chính riêng của bạn.',
            },
            outcomes: {
                title: 'Kết quả chính bạn sẽ đạt được:',
                roadmap: 'Một lộ trình tài chính rõ ràng',
                roadmapDesc: 'Tự xây dựng được một kế hoạch tài chính cá nhân hóa, vạch ra các bước đi rõ ràng, có thể hành động để hướng tới mục tiêu dài hạn.',
                riskAssessment: 'Kỹ năng đánh giá rủi ro',
                riskAssessmentDesc: 'Phát triển năng lực đánh giá chính xác khẩu vị rủi ro của bản thân và lựa chọn các kênh đầu tư phù hợp.',
                assetKnowledge: 'Kiến thức về các lớp tài sản',
                assetKnowledgeDesc: 'Nắm vững kiến thức về các lớp tài sản chính (cổ phiếu, trái phiếu...) và vai trò của chúng trong một danh mục đa dạng hóa.',
                independentDecision: 'Năng lực ra quyết định độc lập',
                independentDecisionDesc: 'Xây dựng sự tự tin và kỹ năng để tự mình đưa ra các quyết định tài chính sáng suốt.',
                budgetingMastery: 'Làm chủ ngân sách & phân bổ vốn',
                budgetingMasteryDesc: 'Học các kỹ thuật thực tế để lập ngân sách, tiết kiệm và phân bổ vốn một cách hiệu quả.',
            },
            note: 'Lưu ý: Chương trình tập trung trang bị kiến thức, không cung cấp khuyến nghị mua/bán cụ thể.',
        },
        portfolioStrategy: {
            title: 'Chiến Lược & Công Cụ Danh Mục',
            description: 'Xây dựng một danh mục đầu tư vững chắc là cả một nghệ thuật và khoa học. Tại Chào Market, triết lý của chúng tôi là một danh mục thành công đòi hỏi cả chiến lược vững chắc và công cụ phù hợp. Dịch vụ này được thiết kế cho các nhà đầu tư đang tự quản lý tài sản nhưng muốn nâng cao phương pháp tiếp cận chiến lược của mình. Chúng tôi sẽ hướng dẫn bạn các nguyên tắc cốt lõi của việc xây dựng danh mục hiện đại, đa dạng hóa và tái cân bằng. Bạn sẽ học cách sử dụng các công cụ dựa trên thuật toán của chúng tôi để tự theo dõi xu hướng thị trường và phân tích hiệu suất danh mục, giúp bạn có thể đưa ra các quyết định chủ động và dựa trên dữ liệu.',
            deliveryOptions: {
                title: 'Hình thức cung cấp (tùy theo nhu cầu của bạn):',
                workshop: 'Workshop nhóm nhỏ tương tác',
                workshopDesc: 'Nắm vững các nguyên tắc trong môi trường nhóm, học hỏi từ các câu hỏi và thảo luận chung.',
                mentoring: 'Cố vấn chuyên sâu 1:1',
                mentoringDesc: 'Một buổi làm việc chuyên sâu tập trung hoàn toàn vào danh mục và mục tiêu chiến lược của bạn.',
            },
            outcomes: {
                title: 'Kết quả chính bạn sẽ đạt được:',
                framework: 'Một khuôn khổ xây dựng thực tiễn',
                frameworkDesc: 'Nắm được một khuôn khổ từng bước để tự xây dựng và đa dạng hóa một danh mục đầu tư vững chắc.',
                rebalancing: 'Kỹ năng tái cân bằng chiến lược',
                rebalancingDesc: 'Làm chủ kỹ năng điều chỉnh và tái cân bằng danh mục một cách có chiến lược để thích ứng với các điều kiện thị trường thay đổi.',
                toolsProficiency: 'Thành thạo công cụ phân tích',
                toolsProficiencyDesc: 'Trở nên thành thạo trong việc sử dụng các công cụ thuật toán để có được góc nhìn khách quan, dựa trên dữ liệu.',
                riskManagement: 'Quản lý rủi ro nâng cao',
                riskManagementDesc: 'Hiểu biết sâu sắc về các kỹ thuật quản lý rủi ro tinh vi để bảo vệ nguồn vốn của bạn.',
                objectiveDecision: 'Ra quyết định khách quan',
                objectiveDecisionDesc: 'Học cách tách biệt cảm xúc khỏi việc đầu tư và đưa ra các quyết định khách quan dựa trên chiến lược và dữ liệu.',
            },
            note: 'Lưu ý: Chúng tôi cung cấp khuôn khổ và công cụ; Mọi quyết định đầu tư cuối cùng đều do bạn thực hiện.',
        },
        algoTrading: {
            title: 'Giải Pháp Giao Dịch Thuật Toán',
            description: 'Bạn có một chiến lược giao dịch độc đáo, nhưng việc thực thi thủ công vừa không hiệu quả. Với vai trò là đối tác kỹ thuật, Chào Market sẽ biến tầm nhìn của bạn thành một hệ thống giao dịch tự động hóa mạnh mẽ. Bạn là nhà chiến lược; chúng tôi là người hiện thực hóa. Quy trình bao gồm các buổi thảo luận sâu để hiểu rõ quy tắc của bạn, lập trình logic, cung cấp báo cáo backtest toàn diện, và hỗ trợ bạn triển khai hệ thống.',
            deliveryMethod: {
                title: 'Hình thức cung cấp:',
                desc: 'Để đảm bảo tính bảo mật và kết quả tùy chỉnh hoàn toàn cho chiến lược độc quyền của bạn, dịch vụ này được thực hiện độc quyền theo hình thức dự án 1:1.',
            },
            outcomes: {
                title: 'Kết quả chính bạn sẽ nhận được:',
                codedSystem: 'Một hệ thống giao dịch hoàn chỉnh',
                codedSystemDesc: 'Một hệ thống tự động đã được lập trình hoàn chỉnh và có thể vận hành, giúp thực thi chiến lược độc đáo của bạn 24/7.',
                backtestReport: 'Báo cáo backtest toàn diện',
                backtestReportDesc: 'Một báo cáo chi tiết phân tích hiệu suất của chiến lược trong quá khứ, cung cấp thông tin về điểm mạnh và điểm yếu tiềm tàng.',
                deployedTool: 'Công cụ được triển khai & tích hợp',
                deployedToolDesc: 'Một hệ thống đã được tích hợp và triển khai đầy đủ trên nền tảng giao dịch bạn chọn, sẵn sàng để sử dụng.',
                systematicExecution: 'Thực thi có hệ thống',
                systematicExecutionDesc: 'Năng lực thực thi chiến lược của bạn một cách chính xác và kỷ luật, hoàn toàn không bị can thiệp bởi yếu tố cảm xúc.',
                fullOwnership: 'Toàn quyền sở hữu và tài liệu',
                fullOwnershipDesc: 'Bạn nhận được toàn bộ mã nguồn và tài liệu kỹ thuật của hệ thống.',
            },
            note: 'Lưu ý: Đây là dịch vụ kỹ thuật. Chúng tôi cung cấp mã nguồn, không cung cấp chiến lược giao dịch.',
        },
        tradingPerformance: {
            title: 'Cố Vấn Hiệu Suất Giao Dịch',
            description: 'Kết quả giao dịch của bạn không nhất quán? Chương trình "Phân tích Chuyên sâu Hiệu suất Chào Market" là dịch vụ cố vấn được thiết kế để tìm ra câu trả lời ngay trong dữ liệu giao dịch của bạn. Chúng tôi sẽ phân tích sâu lịch sử giao dịch của bạn, biến dữ liệu thô thành những hiểu biết có giá trị. Chúng tôi sử dụng phân tích thống kê để tạo ra các báo cáo trực quan, làm nổi bật các chỉ số hiệu suất và mẫu hành vi của bạn. Mục tiêu là thúc đẩy sự tự nhận thức mạnh mẽ, giúp bạn có thể mài giũa kỹ năng quản lý rủi ro và cải thiện kỷ luật giao dịch một cách khách quan.',
            deliveryOptions: {
                title: 'Hình thức cung cấp (tùy theo nhu cầu của bạn):',
                workshop: 'Workshop nhóm',
                workshopDesc: 'Học các phương pháp phân tích qua các case study ẩn danh và thảo luận chung về tâm lý giao dịch.',
                mentoring: 'Cố vấn 1:1',
                mentoringDesc: 'Một buổi phân tích sâu và hoàn toàn bảo mật toàn bộ lịch sử giao dịch của cá nhân bạn, đưa ra các phản hồi riêng tư, cụ thể và một kế hoạch cải thiện phù hợp.',
            },
            outcomes: {
                title: 'Kết quả chính bạn sẽ đạt được:',
                performanceView: 'Góc nhìn rõ ràng về hiệu suất',
                performanceViewDesc: 'Thấu hiểu sâu sắc về các chỉ số hiệu suất chính của bạn (tỷ lệ thắng, rủi ro/lợi nhuận, sụt giảm tối đa...).',
                behavioralPatterns: 'Nhận diện mẫu hành vi',
                behavioralPatternsDesc: 'Năng lực nhận diện và phân tích các xu hướng tâm lý và mẫu hành vi lặp lại của mình (ví dụ: chốt lời non).',
                improvementPlan: 'Kế hoạch cải thiện cụ thể',
                improvementPlanDesc: 'Một kế hoạch với các bước đi rõ ràng, có thể hành động để nâng cao kỷ luật và các quy tắc quản lý rủi ro.',
                selfReviewSkills: 'Kỹ năng tự đánh giá khách quan',
                selfReviewSkillsDesc: 'Kỹ năng xem xét nhật ký và dữ liệu giao dịch của chính mình một cách khách quan để liên tục cải thiện.',
                tradingDiscipline: 'Kỷ luật giao dịch nâng cao',
                tradingDisciplineDesc: 'Tăng cường sự kiểm soát và tính khách quan trong quy trình giao dịch, dẫn đến việc thực thi nhất quán hơn.',
            },
            note: 'Lưu ý: Chương trình giúp bạn tự đánh giá, không đưa ra lời khuyên giao dịch mua/bán trực tiếp.',
        },
        financialCourse: {
            title: 'Khóa Học Đầu Tư Tài Chính',
            description: 'Trong một thế giới quá tải thông tin, việc tìm một nguồn kiến thức đáng tin cậy là chìa khóa. Khóa học Đầu tư Tài chính tại Chào Market được thiết kế để xây dựng chuyên môn của bạn một cách bài bản, từ những viên gạch đầu tiên. Chúng ta sẽ bắt đầu với nền tảng cốt lõi về thị trường tài chính và các loại tài sản, sau đó đi sâu vào các phương pháp phân tích thực tiễn và các chiến lược đầu tư đã được kiểm chứng. Một trọng tâm chính của khóa học là việc ứng dụng thực hành các công cụ thuật toán hiện đại, giúp bạn có đủ năng lực để đưa ra các quyết định sáng suốt hơn dựa trên dữ liệu.',
            deliveryOptions: {
                title: 'Hình thức cung cấp (tùy theo nhu cầu của bạn):',
                groupClass: 'Lớp học nhóm nhỏ',
                groupClassDesc: 'Tham gia một cộng đồng học viên để hưởng lợi từ các buổi thảo luận nhóm và hỏi đáp tương tác.',
                privateMentoring: 'Cố vấn riêng 1:1',
                privateMentoringDesc: 'Một trải nghiệm học tập được tùy chỉnh, nơi chương trình được điều chỉnh riêng theo trình độ kiến thức và mục tiêu của bạn.',
            },
            outcomes: {
                title: 'Kết quả chính bạn sẽ đạt được:',
                foundationalKnowledge: 'Kiến thức nền tảng vững chắc',
                foundationalKnowledgeDesc: 'Hiểu biết toàn diện về cách thị trường tài chính vận hành, bao gồm cổ phiếu, forex và các lớp tài sản chính khác.',
                analysisSkills: 'Kỹ năng phân tích thực tế',
                analysisSkillsDesc: 'Năng lực áp dụng cả phương pháp phân tích cơ bản và kỹ thuật để đánh giá các cơ hội đầu tư.',
                toolProficiency: 'Thành thạo công cụ thuật toán',
                toolProficiencyDesc: 'Kỹ năng thực tiễn trong việc sử dụng các công cụ thuật toán hiện đại để tìm kiếm, phân tích và hỗ trợ các ý tưởng giao dịch.',
                strategicFramework: 'Một khuôn khổ chiến lược',
                strategicFrameworkDesc: 'Một khuôn khổ để phát triển, kiểm thử và tinh chỉnh các chiến lược đầu tư của riêng bạn.',
                confidenceToInvest: 'Sự tự tin để đầu tư',
                confidenceToInvestDesc: 'Sự tự tin để tham gia vào thế giới đầu tư với một phương pháp có cấu trúc, đầy đủ kiến thức và kỷ luật.',
            },
            note: 'Lưu ý: Mọi nội dung và ví dụ đều chỉ nhằm mục đích giáo dục và không phải là lời khuyên đầu tư.',
        },
        common: {
            getStarted: 'Bắt Đầu Ngay',
            title: 'Giải Pháp Của Chào',
        },
    },
    sidebar: {
        home: 'Trang chủ',
        clientsAccounts: 'Tài Khoản Khách hàng',
        marketData: 'Dữ Liệu Thị Trường',
        ourSolutions: 'Giải Pháp Của Chào',
        newsEvents: 'Góc Nhìn Của Chào',
        news: 'Tin Tức',
        events: 'Sự Kiện',
        community: 'Cộng Đồng',
        marketInsights: 'Góc Nhìn Của Chào',
        freeCourses: 'Khóa Học Miễn phí',
        conferences: 'Hội Nghị',
        videos: 'Video',
        images: 'Hình Ảnh',
    },
    bookConsultation: {
        bookConsultation: 'Đặt Lịch Tư Vấn',
    },
    contactButton: {
        quickContactTooltip: 'Nhắn tin với Chào Market',
        methods: {
            messenger: 'Nhắn tin qua Messenger',
            zalo: 'Nhắn tin qua Zalo',
            telegram: 'Nhắn tin qua Telegram',
            callUs: 'Gọi Chào Market',
        },
    },
    footer: {
        aboutUs: {
            title: 'Về Chúng Tôi',
            sections: [
                {
                    title: 'Sứ Mệnh Của Chúng Tôi: Trao Quyền Cho Nhà Đầu Tư Việt',
                    content: [
                        'Chào mừng bạn đến với Chào Market. Chúng tôi tin rằng việc định hướng tài chính thành công trong các thị trường phức tạp ngày nay không đến từ bí mật hay may mắn, mà đến từ việc sở hữu đúng kiến thức, đúng chiến lược và đúng công cụ. Sứ mệnh của chúng tôi là trao quyền cho các nhà đầu tư Việt Nam bằng cách giải mã thế giới tài chính và cung cấp các giải pháp mang tính giáo dục, dựa trên dữ liệu.',
                    ],
                },
                {
                    title: 'Phương Pháp Của Chúng Tôi: Kết Hợp Chuyên Môn Và Công Nghệ',
                    content: [
                        'Được thành lập dựa trên nguyên tắc lấy giáo dục làm đầu, Chào Market kết hợp chuyên môn tài chính sâu sắc với công nghệ hiện đại. Chúng tôi không đưa ra các mánh khóe "làm giàu nhanh"; thay vào đó, chúng tôi cung cấp một lộ trình có cấu trúc để xây dựng kiến thức tài chính và tư duy chiến lược. Các chương trình của chúng tôi, từ cố vấn nền tảng đến phát triển hệ thống nâng cao, đều được thiết kế để trang bị cho bạn kỹ năng để tự mình đưa ra các quyết định sáng suốt và tự tin.',
                        'Chúng tôi là đối tác của bạn trong việc quản lý rủi ro và biến dữ liệu thị trường thành các quyết định tài chính thành công.',
                    ],
                },
            ],
        },
        termOfUse: {
            title: 'Điều khoản Sử dụng',
            sections: [
                {
                    title: '1. Chấp Nhận Điều Khoản',
                    content: 'Bằng việc truy cập và sử dụng website Chào Market, bạn chấp nhận và đồng ý bị ràng buộc bởi các điều khoản sử dụng này. Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ của chúng tôi.',
                },
                {
                    title: '2. Mô Tả Dịch Vụ',
                    content: 'Chào Market cung cấp các dịch vụ giáo dục tài chính, huấn luyện, công cụ và thông tin thị trường, bao gồm các giải pháp như Cố Vấn Nền Tảng Tài Chính, Chiến Lược & Công Cụ Danh Mục, Phát Triển Hệ Thống Giao Dịch, Cố Vấn Hiệu Suất Giao Dịch, và Khóa Học Đầu Tư Tài Chính.',
                },
                {
                    title: '3. Tuyên Bố Miễn Trừ Trách Nhiệm Về Tư Vấn Đầu Tư (CỰC KỲ QUAN TRỌNG)',
                    content: 'Tất cả nội dung, công cụ và dịch vụ được cung cấp trên website này chỉ nhằm mục đích thông tin và giáo dục. Không có bất kỳ nội dung nào trên website này cấu thành, hoặc nên được hiểu là, lời khuyên đầu tư, một sự khuyến nghị, hoặc một lời mời chào mua hay bán bất kỳ chứng khoán hay công cụ tài chính nào. Chào Market không phải là một nhà tư vấn đầu tư hay công ty môi giới được cấp phép. Mọi quyết định đầu tư đều do một mình bạn đưa ra, và bạn hoàn toàn chịu trách nhiệm trong việc đánh giá các giá trị và rủi ro liên quan đến việc sử dụng bất kỳ thông tin nào được cung cấp.',
                },
                {
                    title: '4. Sở Hữu Trí Tuệ',
                    content: 'Toàn bộ nội dung trên trang này, bao gồm văn bản, đồ họa, logo và phần mềm, là tài sản của Chào Market và được bảo vệ bởi luật bản quyền của Việt Nam và quốc tế. Bạn không được phép sao chép, phân phối hoặc tạo ra các tác phẩm phái sinh từ bất kỳ nội dung nào mà không có sự cho phép rõ ràng bằng văn bản của chúng tôi.',
                },
                {
                    title: '5. Giới Hạn Trách Nhiệm',
                    content: 'Chào Market sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc do hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng thông tin và dịch vụ trên trang này. Hiệu suất trong quá khứ không đảm bảo cho kết quả trong tương lai.',
                },
                {
                    title: '6. Luật Điều Chỉnh',
                    content: 'Các điều khoản này sẽ được điều chỉnh và giải thích theo pháp luật của Việt Nam.',
                },
            ],
        },
        privacyPolicy: {
            title: 'Chính sách Quyền riêng tư',
            sections: [
                {
                    title: '1. Dữ Liệu Chúng Tôi Thu Thập',
                    content: 'Chúng tôi thu thập thông tin cá nhân mà bạn cung cấp trực tiếp, chẳng hạn như tên, địa chỉ email và số điện thoại khi bạn điền vào form yêu cầu tư vấn. Chúng tôi cũng tự động thu thập dữ liệu phi cá nhân, như địa chỉ IP và hành vi duyệt web, thông qua cookies.',
                },
                {
                    title: '2. Cách Chúng Tôi Sử Dụng Dữ Liệu Của Bạn',
                    content: 'Dữ liệu của bạn được sử dụng để:\n• Phản hồi các yêu cầu của bạn và cung cấp các dịch vụ bạn đã đăng ký.\n• Cải thiện website và trải nghiệm người dùng.\n• Gửi cho bạn các thông tin tiếp thị, như bản tin (newsletter), chỉ khi bạn đã đồng ý một cách rõ ràng (opt-in).',
                },
                {
                    title: '3. Chia Sẻ Dữ Liệu',
                    content: 'Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên khác. Chúng tôi có thể chia sẻ dữ liệu của bạn với các nhà cung cấp dịch vụ bên thứ ba đáng tin cậy (ví dụ: Google Analytics, các nền tảng email marketing) để hỗ trợ chúng tôi vận hành website, nhưng chỉ cho các mục đích đã nêu ở trên.',
                },
                {
                    title: '4. Quyền Của Bạn',
                    content: 'Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá nhân của mình. Vui lòng liên hệ với chúng tôi để thực hiện các quyền này.',
                },
                {
                    title: '5. Bảo Mật Dữ Liệu',
                    content: 'Chúng tôi thực hiện nhiều biện pháp bảo mật khác nhau để duy trì sự an toàn cho thông tin cá nhân của bạn.',
                },
            ],
        },
        cookiePolicy: {
            title: 'Chính sách Cookie',
            sections: [
                {
                    title: '1. Cookies Là Gì?',
                    content: 'Cookies là các tệp văn bản nhỏ được đặt trên thiết bị của bạn bởi các trang web bạn truy cập. Chúng được sử dụng rộng rãi để giúp các trang web hoạt động hiệu quả hơn và để cung cấp thông tin cho chủ sở hữu trang web.',
                },
                {
                    title: '2. Cách Chúng Tôi Sử Dụng Cookies',
                    content: 'Cookies Thiết Yếu: Cần thiết để website hoạt động bình thường.\nCookies Phân Tích: Chúng tôi sử dụng các cookies này (ví dụ: Google Analytics) để hiểu cách khách truy cập tương tác với website, giúp chúng tôi cải thiện nội dung và dịch vụ.\nCookies Tiếp Thị (nếu có): Các cookies này được dùng để theo dõi khách truy cập trên các trang web nhằm hiển thị các quảng cáo có liên quan.',
                },
                {
                    title: '3. Lựa Chọn Của Bạn',
                    content: 'Bạn có thể kiểm soát và quản lý cookies theo nhiều cách khác nhau. Vui lòng tham khảo phần trợ giúp của trình duyệt để biết thông tin về cách chặn hoặc xóa cookies.',
                },
            ],
        },
    },
    marketData: {
        'marketData': {
            'title': 'Dữ Liệu Thị Trường',
            'items': {
                'indices': {
                    'title': 'Chỉ Số',
                    'items': {
                        'global': { 'title': 'Thế Giới' },
                        'us': { 'title': 'Mỹ' },
                        'vietnam': { 'title': 'Việt Nam' },
                    },
                },
                'markets': {
                    'title': 'Thị Trường',
                    'items': {
                        'usStocks': {
                            'title': 'Chứng Khoán Mỹ',
                            'items': {
                                'overview': { 'title': 'Tổng Quan' },
                                'heatmap': { 'title': 'Bản Đồ Nhiệt' },
                                'chart': { 'title': 'Biểu Đồ' },
                                'news': { 'title': 'Tin Tức' },
                                'calendar': { 'title': 'Lịch' },
                            },
                        },
                        'vietnamStocks': { 'title': 'Chứng Khoán Việt Nam' },
                        'currencies': { 'title': 'Tiền Tệ' },
                        'cryptocurrencies': { 'title': 'Tiền Mã Hóa' },
                        'commodities': { 'title': 'Hàng Hóa' },
                    },
                },
                'financialNews': {
                    'title': 'Tin Tức Tài Chính',
                },
                'economicCalendar': {
                    'title': 'Lịch Kinh Tế',
                },
                'chaoInsights': {
                    'title': 'Góc Nhìn Chào',
                },
            },
        },
    },
    investors: {
        'title': 'Chào & Nhà Đầu Tư',
        'items': {
            'chaoAnnoucement': {
                'title': 'Chào Thông Báo',
            },
            'chaoSocial': {
                'title': 'Mạng Xã Hội Chào',
                'items': {
                    'facebook': { 'title': 'Facebook' },
                    'tiktok': { 'title': 'Tiktok' },
                    'threads': { 'title': 'Threads' },
                    'youtube': { 'title': 'Youtube' },
                },
            },
            'toolForInvestor': {
                'title': 'Công Cụ Cho Nhà Đầu Tư',
                'items': {
                    'currencyConverterCalc': {
                        'title': 'Chuyển Đổi Tiền Tệ',
                        'description': 'Công cụ này giúp bạn chuyển đổi giá trị giữa các loại tiền tệ khác nhau.',
                    },
                    'pipCalculator': {
                        'title': 'Tính Pip',
                        'description': 'Công cụ tính toán giá trị pip cho các cặp tiền tệ trong giao dịch forex.',
                    },
                    'profitCalculator': {
                        'title': 'Tính Lợi Nhuận',
                        'description': 'Công cụ tính toán lợi nhuận và lỗ trong các giao dịch đầu tư.',
                    },
                    'pivotalCalculator': {
                        'title': 'Tính Điểm Xoay',
                        'description': 'Công cụ tính toán các điểm xoay hỗ trợ và kháng cự trong phân tích kỹ thuật.',
                    },
                    'fiboCalculator': {
                        'title': 'Tính Fibonacci',
                        'description': 'Công cụ tính toán các mức Fibonacci retracement và extension.',
                    },
                    'marginCalculator': {
                        'title': 'Tính Ký Quỹ',
                        'description': 'Công cụ tính toán số tiền ký quỹ cần thiết cho các vị thế giao dịch.',
                    },
                    'investmentCalculator': {
                        'title': 'Tính Tiền Lãi',
                        'description': 'Công cụ tính toán lợi tức đầu tư và giá trị tương lai của khoản đầu tư.',
                    },
                },
            },
        },
    },
    community: {
        'title': 'Cộng Đồng',
        'items': {
            'chaoConnect': {
                'title': 'Chào Kết Nối',
            },
            'freeCourses': {
                'title': 'Khóa Học Miễn Phí',
            },
            'workShops': {
                'title': 'Hội Thảo Chuyên Đề',
            },
        },
    },
};