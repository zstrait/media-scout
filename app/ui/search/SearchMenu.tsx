'use-client'

import { Button, Text, Divider, TextInput, Stack, Group, SimpleGrid } from '@mantine/core';
import { FilterConditions } from '@/app/lib/types';

interface SearchMenuProps {
    filters: FilterConditions,
    onFilterChange: (newFilters: FilterConditions) => void;
}

export default function SearchMenu({ filters, onFilterChange }: SearchMenuProps) {
    const sortOptions = ['Best Match', 'Price: Low to High', 'Price: High to Low'];
    const formatOptions = ['Vinyl', 'CD', 'Cassette', 'Other'];
    const platformOptions = ['eBay', 'Discogs'];

    const toggleItem = (category: 'format' | 'platform' | 'condition', value: string) => {
        const currentCategory = filters[category];
        const isCurrentlySelected = currentCategory.includes(value);
        const updatedCategory = isCurrentlySelected
            ? currentCategory.filter(item => item !== value)
            : [...currentCategory, value];

        onFilterChange({ ...filters, [category]: updatedCategory });
    }

    return (
        <div className='w-[200px]'>
            <Stack gap={14}>
                <Stack gap={6}>
                    <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Sort
                    </Text>
                    <Stack gap={6}>
                        {sortOptions.map(s => {
                            const isActive = filters.sorting === s;
                            return (
                                <Button
                                    key={s}
                                    onClick={() => onFilterChange({ ...filters, sorting: s })}
                                    variant="default"
                                    fullWidth
                                    radius="md"
                                    size="sm"
                                    ff="monospace"
                                    bg={isActive ? '#4a4a4a' : '#1E1E1E'}
                                    c={isActive ? '#fff' : '#6b7280'}
                                    bd={`1px solid ${isActive ? '#666' : '#383838'}`}
                                    style={{ transition: 'all 120ms ease' }}
                                >
                                    {s}
                                </Button>
                            );
                        })}
                    </Stack>
                </Stack>

                <Divider color="#383838" />

                {/* Price */}
                <Stack gap={6}>
                    <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Price
                    </Text>
                    <Group gap={8} wrap="nowrap" align="center">
                        <TextInput
                            placeholder="MIN"
                            value={filters.priceMin || ''}
                            onChange={(e) => { onFilterChange({ ...filters, priceMin: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}

                        />
                        <Text c="dimmed" size="sm" style={{ flexShrink: 0 }}>—</Text>
                        <TextInput
                            placeholder="MAX"
                            value={filters.priceMax || ''}
                            onChange={(e) => { onFilterChange({ ...filters, priceMax: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}

                        />
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Format */}
                <Stack gap={6}>
                    <Text size="s" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Format
                    </Text>
                    <SimpleGrid cols={2} spacing={6}>
                        {formatOptions.map(f => {
                            const isActive = filters.format.includes(f);
                            return (
                                <Button
                                    key={f}
                                    onClick={() => toggleItem('format', f)}
                                    variant="default"
                                    fullWidth
                                    radius="md"
                                    size="sm"
                                    ff="monospace"
                                    fz={12}
                                    bg={isActive ? '#4a4a4a' : '#1E1E1E'}
                                    c={isActive ? '#fff' : '#6b7280'}
                                    bd={`1px solid ${isActive ? '#666' : '#383838'}`}
                                    style={{ transition: 'all 120ms ease' }}
                                >
                                    {f}
                                </Button>
                            );
                        })}
                    </SimpleGrid>
                </Stack>

                <Divider color="#383838" />

                <Stack gap={6}>
                    <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Release Year
                    </Text>
                    <Group gap={8} wrap="nowrap" align="center">
                        <TextInput
                            placeholder="MIN"
                            value={filters.yearMin || ''}
                            onChange={(e) => { onFilterChange({ ...filters, yearMin: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}
                        />
                        <Text c="dimmed" size="sm" style={{ flexShrink: 0 }}>—</Text>
                        <TextInput
                            placeholder="MAX"
                            value={filters.yearMax || ''}
                            onChange={(e) => { onFilterChange({ ...filters, yearMax: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}

                        />
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Platform */}
                <Stack gap={6}>
                    <Text size="s" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Platform
                    </Text>
                    <Group grow wrap="nowrap" gap={6}>
                        {platformOptions.map(p => {
                            const isActive = filters.platform.includes(p);
                            return (
                                <Button
                                    key={p}
                                    onClick={() => toggleItem('platform', p)}
                                    variant="default"
                                    fullWidth
                                    radius="md"
                                    size="sm"
                                    ff="monospace"
                                    bg={isActive ? '#4a4a4a' : '#1E1E1E'}
                                    c={isActive ? '#fff' : '#6b7280'}
                                    bd={`1px solid ${isActive ? '#666' : '#383838'}`}
                                    style={{ transition: 'all 120ms ease' }}
                                >
                                    {p}
                                </Button>
                            );
                        })}
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Condition */}
                <Stack gap={6}>
                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Condition
                    </Text>

                    <Stack gap={6}>
                        <Group grow wrap="nowrap" gap={6}>
                            <Button
                                onClick={() => toggleItem('condition', 'New')}
                                variant="default"
                                fullWidth
                                radius="md"
                                size="sm"
                                ff="monospace"
                                bg={filters.condition.includes('New') ? '#4a4a4a' : '#1E1E1E'}
                                c={filters.condition.includes('New') ? '#fff' : '#6b7280'}
                                bd={`1px solid ${filters.condition.includes('New') ? '#666' : '#383838'}`}
                                style={{ transition: 'all 120ms ease' }}
                            >
                                New
                            </Button>

                            <Button
                                onClick={() => toggleItem('condition', 'Used')}
                                variant="default"
                                fullWidth
                                radius="md"
                                size="sm"
                                ff="monospace"
                                bg={filters.condition.includes('Used') ? '#4a4a4a' : '#1E1E1E'}
                                c={filters.condition.includes('Used') ? '#fff' : '#6b7280'}
                                bd={`1px solid ${filters.condition.includes('Used') ? '#666' : '#383838'}`}
                                style={{ transition: 'all 120ms ease' }}
                            >
                                Used
                            </Button>
                        </Group>
                    </Stack>
                </Stack>

            </Stack>
        </div>
    );
}