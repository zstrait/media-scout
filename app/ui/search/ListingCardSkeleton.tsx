import { Skeleton } from '@mantine/core';

export default function ListingCardSkeleton() {
    return (
        <div className="w-[695px] h-[195px] bg-[#343333] flex border border-[#3d3d3d] items-stretch p-4 gap-6 justify-between rounded-3xl">
            {/* Cover */}
            <Skeleton height={160} width={160} radius="xl" />

            <div className="flex flex-col flex-1 justify-between py-2 min-w-0">
                <div className="flex flex-col gap-2">
                    {/* Title */}
                    <Skeleton height={28} width="70%" radius="md" />

                    {/* Artist • Year */}
                    <div className="flex gap-2">
                        <Skeleton height={20} width="40%" radius="md" />
                    </div>
                </div>

                {/* Format • Condition */}
                <div className="flex gap-2">
                    <Skeleton height={20} width="30%" radius="md" />
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center">
                <Skeleton height={40} width={100} radius="md" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col justify-between py-2">
                <Skeleton height={32} width={32} radius="xl" />
                <Skeleton height={32} width={32} radius="xl" />
            </div>
        </div>
    )
}
