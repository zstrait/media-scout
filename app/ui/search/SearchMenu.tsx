'use-client'

import { Button, ActionIcon, Text, Divider, TextInput, Stack, Group, SimpleGrid } from '@mantine/core';
import { FilterConditions } from '@/app/lib/types';
import { PanelLeftClose, PanelRightClose, ArrowDownUp, Banknote, Disc3, CalendarDays, Store, Tag } from 'lucide-react';

interface SearchMenuProps {
    filters: FilterConditions,
    onFilterChange: (newFilters: FilterConditions) => void,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function SearchMenu({ filters, onFilterChange, isOpen, setIsOpen }: SearchMenuProps) {
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
        <div className='w-[232px] p-3  bg-[#242424] drop-shadow-lg border-3 border-l-0 border-[#3d3d3daf] rounded-xl rounded-l-none'>
            <div className='flex items-center justify-between pb-3'>
                <Text fw={700} c="dimmed" style={{ fontSize: '20px' }}>
                    Sort & Filter
                </Text>
                <ActionIcon onClick={() => setIsOpen(!isOpen)} variant='transparent' color='' size='md'>
                    {isOpen ? (
                        <PanelLeftClose size={28} strokeWidth={1.75} color='#828282' />
                    ) : (
                        <PanelRightClose size={28} strokeWidth={1.75} color='#828282' />
                    )}
                </ActionIcon>
            </div>

            <Stack gap={14} className={`transition-all duration-300 ease-in-out ${isOpen ? '' : '-translate-x-12'}`}>
                <Stack gap={6}>
                    <div className='flex items-center gap-2 '>
                        <ArrowDownUp size={16} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Sort
                        </Text>
                    </div>
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
                    <div className='flex items-center gap-2 '>
                         <Banknote size={18} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Price
                        </Text>
                    </div>
                    <Group gap={8} wrap="nowrap" align="center">
                        <TextInput
                            placeholder="MIN"
                            value={filters.priceMin || ''}
                            onChange={(e) => { onFilterChange({ ...filters, priceMin: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "!bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
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
                                input: "!bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}

                        />
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Format */}
                <Stack gap={6}>
                    <div className='flex items-center gap-2 '>
                        <Disc3 size={16} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Format
                        </Text>
                    </div>
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
                    <div className='flex items-center gap-2 '>
                        <CalendarDays size={16} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Release Year
                        </Text>
                    </div>
                    <Group gap={8} wrap="nowrap" align="center">
                        <TextInput
                            placeholder="MIN"
                            value={filters.yearMin || ''}
                            onChange={(e) => { onFilterChange({ ...filters, yearMin: Number(e.currentTarget.value) }) }}
                            size="xs"
                            radius="sm"
                            classNames={{
                                root: "flex-1",
                                input: "!bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
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
                                input: "!bg-[#1E1E1E] border-[#383838] text-gray-200 placeholder:text-center font-mono text-sm h-full"
                            }}

                        />
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Platform */}
                <Stack gap={6}>
                      <div className='flex items-center gap-2 '>
                        <Store size={16} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Platform
                        </Text>
                    </div>
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
                      <div className='flex items-center gap-2 '>
                        <Tag size={16} color='#828282' />
                        <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                            Condition
                        </Text>
                    </div>
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
        </div >
    );
}