import React from 'react';
import { columns, HomeNewFlow } from './columns';
import { DataTable } from '@/components/data-table';
import { getTabData } from './data-utils';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';

const Page = async () => {
    const data = (await getTabData('newsFlow')) as HomeNewFlow[];

    return (
        <div className="w-full flex flex-col gap-4">
            {/*<GeneralBanner />*/}
            <TabNavigation
                searchParams={{}}
                currentHref={'/market-data/insights'}
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Page;
