import { useState } from 'react';
import { Text, Divider, UnstyledButton, TextInput, Stack, Group, SimpleGrid } from '@mantine/core';

export default function SearchMenu() {
    const [selectedSort, setSelectedSort] = useState('Best Match');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [selectedFormat, setSelectedFormat] = useState<string[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string[]>([]);

    const sortOptions = ['Best Match', 'Price: Low to High', 'Price: High to Low'];
    const formatOptions = ['Vinyl', 'CDs', 'Cassette', 'Other'];
    const platformOptions = ['eBay', 'Discogs'];
    const conditionOptions = ['New', 'Used', 'Other'];

    const toggleItem = (value: string, list: string[], setList: (v: string[]) => void) => {
        setList(list.includes(value) ? list.filter(i => i !== value) : [...list, value]);
    };

    const btnStyle = (active: boolean): React.CSSProperties => ({
        backgroundColor: active ? '#4a4a4a' : '#1E1E1E',
        color: active ? '#fff' : '#6b7280',
        border: `1px solid ${active ? '#666' : '#383838'}`,
        borderRadius: '6px',
        padding: '7px 12px',
        fontFamily: 'monospace',
        fontSize: '14px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 120ms ease',
        width: '100%',
    });

    const inputStyles = {
        root: { flex: 1 },
        input: {
            backgroundColor: '#1E1E1E',
            border: '1px solid #383838',
            color: '#e5e7eb',
            textAlign: 'center' as const,
            fontFamily: 'monospace',
            fontSize: '14px',
        },
    };

    return (
        <div className='pt-4'>
            <Stack gap={14}>

                <Stack gap={6}>
                    <Text fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Sort
                    </Text>
                    <Stack gap={6}>
                        {sortOptions.map(s => (
                            <UnstyledButton
                                key={s}
                                onClick={() => setSelectedSort(s)}
                                style={btnStyle(selectedSort === s)}
                            >
                                {s}
                            </UnstyledButton>
                        ))}
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
                            value={priceMin}
                            onChange={e => setPriceMin(e.currentTarget.value)}
                            size="xs"
                            radius="sm"
                            styles={inputStyles}
                        />
                        <Text c="dimmed" size="sm" style={{ flexShrink: 0 }}>—</Text>
                        <TextInput
                            placeholder="MAX"
                            value={priceMax}
                            onChange={e => setPriceMax(e.currentTarget.value)}
                            size="xs"
                            radius="sm"
                            styles={inputStyles}
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
                        {formatOptions.map(f => (
                            <UnstyledButton
                                key={f}
                                onClick={() => toggleItem(f, selectedFormat, setSelectedFormat)}
                                style={btnStyle(selectedFormat.includes(f))}
                            >
                                {f}
                            </UnstyledButton>
                        ))}
                    </SimpleGrid>
                </Stack>

                <Divider color="#383838" />

                {/* Platform */}
                <Stack gap={6}>
                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Platform
                    </Text>
                    <Group gap={6} grow>
                        {platformOptions.map(p => (
                            <UnstyledButton
                                key={p}
                                onClick={() => toggleItem(p, selectedPlatform, setSelectedPlatform)}
                                style={btnStyle(selectedPlatform.includes(p))}
                            >
                                {p}
                            </UnstyledButton>
                        ))}
                    </Group>
                </Stack>

                <Divider color="#383838" />

                {/* Condition */}
                <Stack gap={6}>
                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.08em', fontSize: '14px' }}>
                        Condition
                    </Text>
                    <Group gap={6} grow>
                        {conditionOptions.map(c => (
                            <UnstyledButton
                                key={c}
                                onClick={() => toggleItem(c, selectedCondition, setSelectedCondition)}
                                style={btnStyle(selectedCondition.includes(c))}
                            >
                                {c}
                            </UnstyledButton>
                        ))}
                    </Group>
                </Stack>

            </Stack>
        </div>
    );
}