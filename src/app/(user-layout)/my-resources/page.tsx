/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ExternalLink, PackageOpen, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/context/i18n/context';
import { useRouter } from 'next/navigation';
import { useUserPaidTransactionsQuery } from '@/hooks/react-query/user/use-user-resources-query';

export default function PurchasedResources() {
    const { transactions, isLoading } = useUserPaidTransactionsQuery();
    const { locale, t } = useI18n();
    const router = useRouter();

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                {[1, 2].map(i => (
                    <Card key={i} className="p-0 border-none bg-card/50">
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4 items-center">
                                <Skeleton className="h-20 w-32 rounded-md" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    // 2. Empty State (No paid transactions)
    if (transactions.length === 0) {
        return (
            <div className="text-center py-20 space-y-4">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <PackageOpen className="text-muted-foreground h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">
                    {t('resources.empty.title') || 'No Resources Found'}
                </h2>
                <p className="text-muted-foreground">
                    {t('resources.empty.description') ||
                        "You haven't purchased any modular solutions yet."}
                </p>
                <Button
                    variant="outline"
                    onClick={() => router.push('/chao-solutions?tab=modular')}
                >
                    {t('resources.empty.button') || 'Browse Solutions'}
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold px-1">
                {t('resources.title') || 'My Purchased Resources'}
            </h1>

            {transactions.map((order: any) => (
                <Card
                    key={order.transactionId}
                    className="shadow-lg border-none bg-card/50 backdrop-blur-sm overflow-hidden"
                >
                    <CardHeader className="bg-muted/30 pb-4">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    {t('resources.purchasedOn') ||
                                        'Purchased on'}{' '}
                                    {new Date(order.paidAt).toLocaleDateString(
                                        locale === 'vi' ? 'vi-VN' : 'en-US'
                                    )}
                                </CardTitle>
                                <p className="text-xs font-mono opacity-50 uppercase">
                                    ID: {order.transactionId.slice(0, 8)}
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-600 border-green-500/20"
                            >
                                {t('common.paid') || 'Paid'}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="grid gap-6 pt-6">
                        {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        {item.imageUrl && (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name?.[locale]}
                                                className="h-20 w-32 aspect-video object-cover rounded-md shadow-sm"
                                            />
                                        )}
                                        <div className="space-y-1">
                                            <p className="font-semibold text-lg leading-tight">
                                                {item.name?.[locale]}
                                            </p>
                                            <Badge
                                                variant="secondary"
                                                className="text-[10px] uppercase tracking-wider"
                                            >
                                                {item.type || 'Solution'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Button
                                        asChild
                                        className="w-full sm:w-auto font-semibold bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/80 text-black"
                                    >
                                        <a
                                            href={item.driveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            {t('resources.accessLink') ||
                                                'Open Google Drive'}
                                        </a>
                                    </Button>
                                </div>
                                {idx < order.items.length - 1 && (
                                    <Separator className="opacity-50" />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
