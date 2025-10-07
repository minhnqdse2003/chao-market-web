import React from 'react';
import { columns, HomeNewFlow } from './columns';
import { DataTable } from '@/components/data-table';
import { getTabData } from './data-utils';

const Page = async () => {
    const data = (await getTabData('newsFlow')) as HomeNewFlow[];

    return (
        <div className="w-full flex flex-col gap-4">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Page;
