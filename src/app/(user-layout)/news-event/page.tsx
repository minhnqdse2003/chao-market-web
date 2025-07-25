'use client';
import { AppTabs, TabItem } from '@/components/app-tabs';
import React from 'react';
import { NewsType } from './utils/data-utils';
import NewsComp from './components/news';
import NewsEventFilterDialogComp from './components/news-filter';
import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { getPosts } from '@/app/api/posts';
import { Post } from '@/db/schema';
import { PaginatedResponse } from '@/types/pagination';
import RichTextPreview from '@/components/rich-text-preview';
import { NewsEventsBanner } from '@/components/app-banner';
import LoadingComponent from '@/components/loading-spiner';

// Loading component for Suspense fallback

const Page = () => {
    const { data: postsData, isFetching } = useAppQuery<
        PaginatedResponse<Post>
    >({
        queryFn: getPosts,
        queryKey: ['posts'],
    });

    // Map posts data to NewsType format
    const mapPostsToNewsType = (): NewsType[] => {
        if (!postsData?.data) return [];

        return postsData?.data.map(post => ({
            title: post.title,
            description: post.description,
            image: 'https://i.pravatar.cc/150?img=9', // Placeholder image
            like: post.likes,
            dislike: post.dislikes,
            views: post.views,
            date: post.createdAt
                ? new Date(post.createdAt).toISOString().split('T')[0]
                : '',
            referenceSource: post.referenceSource,
        }));
    };

    const tabs: TabItem[] = [
        {
            title: 'All',
            value: 'all',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Recommended',
            value: 'recommended',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Hottest',
            value: 'hottest',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Most Viewed',
            value: 'mostViewed',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Top Rated',
            value: 'topRated',
            renderContent: async () => {
                const data = mapPostsToNewsType();
                return <NewsComp news={data} />;
            },
        },
    ];

    const onApply = (value: unknown) => {
        console.log(value);
    };

    return (
        <div>
            <NewsEventsBanner />
            {isFetching ? (
                <LoadingComponent />
            ) : (
                <div className="mt-12">
                    <NewsEventFilterDialogComp
                        onApply={value => onApply(value)}
                    />
                    <AppTabs tabsList={tabs} />
                </div>
            )}
            <RichTextPreview
                contents={`<h1><strong>Tổng Bí thư: Tri ân người có công là đạo lý của dân tộc</strong></h1><blockquote><p>Tổng Bí thư Tô Lâm nhấn mạnh tri ân người có công không chỉ là truyền thống mà còn là trách nhiệm và đạo lý của dân tộc, được hiện thực hóa bằng hành động thiết thực.</p></blockquote><p>Trong bài viết "Uống nước nhớ nguồn" ngày 23/7, Tổng Bí thư Tô Lâm khẳng định mỗi năm vào tháng Bảy, nhân dân Việt Nam lại dành tình cảm sâu lắng để tưởng nhớ, tri ân những người hy sinh vì độc lập, tự do và sự bình yên của Tổ quốc. Ngày 27/7 là dịp toàn Đảng, toàn dân, toàn quân thể hiện lòng biết ơn sâu sắc với gia đình người có công với cách mạng.</p><p>Tổng Bí thư nhấn mạnh truyền thống "uống nước nhớ nguồn" là sợi dây thiêng liêng kết nối các thế hệ, là nguồn sức mạnh tinh thần để dân tộc vượt qua mọi khó khăn, xây dựng đất nước ngày càng giàu mạnh, văn minh. Lịch sử hơn 4.000 năm của dân tộc "là bản trường ca bất diệt của lòng yêu nước, ý chí quật cường và tinh thần đấu tranh bất khuất, là sự tri ân của những người đang sống với những người đã hiến dâng cuộc đời cho non sông đất nước".</p><p>Ông khẳng định không thể có ngày hôm nay, không thể có một Việt Nam đổi mới, phát triển, hội nhập sâu rộng nếu không có mồ hôi, máu xương của bao thế hệ chiến sĩ cách mạng, bộ đội, thanh niên xung phong, dân công hỏa tuyến, những người mẹ, người cha sẵn sàng động viên con cháu ra trận và giành phần khó khăn, gian khổ, mất mát về mình với tinh thần "quyết tử cho tổ quốc quyết sinh", "tất cả vì tiền tuyến".</p><p>Dẫn lời Chủ tịch Hồ Chí Minh căn dặn về tưởng niệm liệt sĩ, trách nhiệm chăm sóc thương binh và gia đình họ, Tổng Bí thư cho biết thời gian qua, nhiều chính sách ưu đãi đã được ban hành; nhiều ngôi nhà tình nghĩa, món quà 27/7 đã đến với người có công ở khắp mọi miền đất nước. Các văn bản quan trọng như Chỉ thị 14 của Ban Bí thư năm 2017, Nghị quyết 42 của Trung ương năm 2023 và Pháp lệnh ưu đãi người có công là minh chứng cho tình cảm, đạo lý và trách nhiệm sâu sắc của Đảng, Nhà nước, nhân dân với những người đã "tận trung với nước, tận hiếu với dân".</p><img src="https://i1-vnexpress.vnecdn.net/2025/07/23/Hinh-anh-1753274919-6930-1753275019.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=_ownQZyIzAx059ygjOlaJA" alt="Tổng Bí thư Tô Lâm. Ảnh: Quỳnh Trần"><p style="text-align: left;">Tổng Bí thư Tô Lâm. Ảnh: <em>Quỳnh Trần</em></p><p><strong>Mở rộng chính sách với người có công chưa được ghi nhận đúng mức</strong></p><p>Tổng Bí thư yêu cầu tiếp tục tăng cường vai trò lãnh đạo, chỉ đạo của cấp ủy, chính quyền, Mặt trận Tổ quốc và các đoàn thể trong chăm lo, bảo vệ quyền lợi người có công; bảo đảm chính sách ưu đãi được thực hiện đầy đủ, kịp thời, không hình thức. Đồng thời, các cơ quan cần rà soát, hoàn thiện chính sách theo hướng công bằng, minh bạch, mở rộng tới những người có đóng góp thực sự nhưng chưa được ghi nhận đúng mức; cải cách thủ tục hành chính trong xác nhận, giải quyết chế độ.</p><p>Việc tập trung nguồn lực cải thiện đời sống vật chất, tinh thần cho người có công, nhất là ở vùng sâu, vùng xa, biên giới, hải đảo, căn cứ cách mạng và kháng chiến cũ cần được chú trọng. Các địa phương đẩy mạnh chương trình đền ơn đáp nghĩa như xây dựng, sửa chữa nhà tình nghĩa, hỗ trợ y tế, phục hồi chức năng, đào tạo nghề và tạo việc làm bền vững cho con em người có công.</p><p>Tổng Bí thư cũng yêu cầu phát huy vai trò giám sát của nhân dân, Mặt trận và các tổ chức trong thực hiện chính sách, đồng thời xử lý nghiêm các hành vi trục lợi, gian dối; đẩy mạnh công tác tuyên truyền, giáo dục truyền thống yêu nước, tri ân người có công, đặc biệt trong thế hệ trẻ; lồng ghép nội dung này vào chương trình giáo dục, hoạt động ngoại khóa tại nhà trường và các cơ quan, đơn vị.</p><p>Việc ứng dụng công nghệ số trong xây dựng cơ sở dữ liệu người có công, kết nối hệ thống quản lý, hỗ trợ truy tìm hài cốt liệt sĩ cần được đẩy mạnh; đồng thời ứng dụng tiến bộ khoa học công nghệ trong công tác tìm kiếm, quy tập hài cốt liệt sỹ, xác định danh tính liệt sỹ còn thiếu thông tin.</p><img src="https://i1-vnexpress.vnecdn.net/2025/07/15/BNinh-Untitled-19-1-1752583616-2289-1752583927.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=lsZOo6-DBFF4zRRXXxFlcA" alt="Tổng Bí thư Tô Lâm cùng các thương binh, bệnh binh tại Trung tâm điều dưỡng thương binh Thuận Thành, Bắc Ninh, chiều 15/7. Ảnh: Cổng thông tin Đảng Cộng sản VN"><p style="text-align: left;">Tổng Bí thư Tô Lâm thăm thương binh, bệnh binh tại Trung tâm điều dưỡng thương binh Thuận Thành, Bắc Ninh, chiều 15/7. Ảnh: <em>Cổng thông tin Đảng Cộng sản VN</em></p><p>Lãnh đạo Đảng yêu cầu các hoạt động tri ân, tưởng niệm, tôn vinh người có công cần được tổ chức thiết thực, chu đáo, tránh hình thức, lãng phí; các phong trào "Đền ơn đáp nghĩa", "Toàn dân chăm sóc người có công" phải gắn với xây dựng nông thôn mới, đô thị văn minh, quốc phòng toàn dân và an sinh xã hội.</p><p>"Các nhiệm vụ trên cần được cụ thể hóa thành chương trình hành động tại từng địa phương, từng cơ quan, tổ chức với tinh thần trách nhiệm cao nhất, thể hiện sâu sắc lòng biết ơn đối với sự hy sinh to lớn của các thương binh, liệt sĩ và người có công với cách mạng", Tổng Bí thư nói.</p><p style="text-align: center;"><a target="_blank" rel="noopener noreferrer nofollow" href="https://vnexpress.net/tong-bi-thu-tri-an-nguoi-co-cong-la-trach-nhiem-dao-ly-cua-dan-toc-4918110-p2.html"><strong>&gt;&gt; Bài viết của Tổng Bí thư: "Uống nước nhớ nguồn"</strong></a></p><p style="text-align: right;"><strong>Vũ Tuân</strong></p>`}
            />
        </div>
    );
};

export default Page;
