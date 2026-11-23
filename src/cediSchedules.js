export const CEDI_GROUPS = ['1A', '1B', '1C', '3A', '3B', '3C', '5A', '5B', '5C', '5D']

export const CEDI_TIMES = [
    { startTime: '08:00', endTime: '08:55' },
    { startTime: '09:00', endTime: '09:55' },
    { startTime: '10:00', endTime: '10:55' },
    { startTime: '12:00', endTime: '12:55' },
    { startTime: '13:00', endTime: '13:55' },
    { startTime: '14:00', endTime: '14:55' },
]

export const CEDI_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

// Filas: 08:00, 09:00, 10:00, 12:00, 13:00 y 14:00.
// Columnas: lunes, martes, miércoles, jueves y viernes.
export const CEDI_SCHEDULES = {
    '1A': [
        ['FSE', 'MRFL', 'CN', 'CDD', 'LQ'],
        ['FSE', 'LC', 'CSOC', 'CN', 'TUT'],
        ['MRFL', 'FSE', 'TUT', 'CSOC', 'CSOC'],
        ['LCF', 'CDD', 'LC', 'LC', 'LCF'],
        ['CN', 'CN', 'LCF', 'LC', 'LCF'],
        ['MRFL', 'CDD', 'MRFL', 'LCF', 'MRFL'],
    ],
    '1B': [
        ['LCF', 'LCF', 'LCF', 'LCF', 'TUT'],
        ['LCF', 'MRFL', 'LC', 'LC', 'MRFL'],
        ['CN', 'LC', 'MRFL', 'FSE', 'CDD'],
        ['CSOC', 'CSOC', 'CN', 'CDD', 'LC'],
        ['FSE', 'CSOC', 'MRFL', 'CDD', 'TUT'],
        ['CN', 'CN', 'FSE', 'MRFL', 'LQ'],
    ],
    '1C': [
        ['LCF', 'LCF', 'LCF', 'LCF', 'CDD'],
        ['LCF', 'FSE', 'FSE', 'CDD', 'CN'],
        ['FSE', 'MRFL', 'LC', 'LC', 'MRFL'],
        ['CN', 'CN', 'MRFL', 'MRFL', 'TUT'],
        ['CSOC', 'CDD', 'TUT', 'MRFL', 'LQ'],
        ['CSOC', 'CSOC', 'LC', 'CN', 'LC'],
    ],
    '3A': [
        ['MRGA', 'MRGA', 'LC III', 'CWW', 'LC III'],
        ['FME', 'LCF', 'LCF', 'LCF', 'LCF'],
        ['CIC', 'FME', 'CWW', 'FME', 'ELL'],
        ['PESV', 'LC III', 'CWW', 'MRGA', 'PESV'],
        ['CIC', 'FME', 'ELL', 'ELL', 'PESV'],
        ['MRGA', 'MRGA', 'CIC', 'PESV', 'FME'],
    ],
    '3B': [
        ['LC III', 'SPE', 'SPE', 'FME', 'PESV'],
        ['AyF', 'LCF', 'LCF', 'LCF', 'LCF'],
        ['LC III', 'CIC', 'AyF', 'SPE', 'MRGA'],
        ['CIC', 'FME', 'MRGA', 'PESV', 'FME'],
        ['FME', 'MRGA', 'AyF', 'MRGA', 'LC III'],
        ['FME', 'PESV', 'PESV', 'CIC', 'MRGA'],
    ],
    '3C': [
        ['FIS', 'FIS', 'FME', 'LC III', 'MRGA'],
        ['FIS', 'LCF', 'LCF', 'LCF', 'LCF'],
        ['FME', 'MRGA', 'PESV', 'MRGA', 'LC III'],
        ['MRGA', 'PESV', 'CIC', 'FME', 'FR'],
        ['LC III', 'PESV', 'FME', 'CIC', 'FR'],
        ['PESV', 'FME', 'FR', 'MRGA', 'CIC'],
    ],
    '5A': [
        ['SSR', 'MCAI', 'CMEM', 'TC', 'TDAD'],
        ['MTDF', 'TC', 'TC', 'MCAI', 'SSR'],
        ['LCF', 'LCF', 'LCF', 'LCF', 'LCF'],
        ['CS', 'TW', 'CS', 'CMEM', 'MCAI'],
        ['BQ', 'TDAD', 'SSR', 'BQ', 'TDAD'],
        ['BQ', 'BQ', 'CS', 'TW', 'SSR'],
    ],
    '5B': [
        ['BQ', 'SSR', 'CS', 'SSR', 'TDAD'],
        ['BQ', 'SSR', 'CS', 'TC', 'CMEM'],
        ['LCF', 'LCF', 'LCF', 'LCF', 'LCF'],
        ['TDAD', 'TC', 'TC', 'MCAI', 'MTDF'],
        ['SSR', 'MCAI', 'CMEM', 'TW', 'MCAI'],
        ['CS', 'TW', 'TDAD', 'BQ', 'BQ'],
    ],
    '5C': [
        ['CMEM', 'AAD', 'ARCM', 'AAD', 'MA'],
        ['TDAD', 'AAD', 'TDAD', 'AAD', 'CS'],
        ['ARCM', 'MA', 'DSW', 'MTDF', 'MCAI'],
        ['MA', 'ARCM', 'DSW', 'TW', 'ARCM'],
        ['TDAD', 'TW', 'MCAI', 'DSW', 'CMEM'],
        ['MA', 'CS', 'MCAI', 'CS', 'DSW'],
    ],
    '5D': [
        ['CS', 'TW', 'AAD', 'MCAI', 'MCAI'],
        ['AAD', 'MCAI', 'AAD', 'ARCM', 'DSW'],
        ['CS', 'TW', 'MA', 'AAD', 'TDAD'],
        ['DSW', 'MA', 'MA', 'MTDF', 'CMEM'],
        ['ARCM', 'CS', 'ARCM', 'TDAD', 'TDAD'],
        ['DSW', 'CMEM', 'ARCM', 'DSW', 'MA'],
    ],
}

export function getCediScheduleEntries(group) {
    const matrix = CEDI_SCHEDULES[group] ?? []
    return matrix.flatMap((row, timeIndex) =>
        row.map((subject, dayIndex) => ({
            id: `cedi-${group}-${timeIndex}-${dayIndex}`,
            subject,
            day: dayIndex,
            startTime: CEDI_TIMES[timeIndex].startTime,
            endTime: CEDI_TIMES[timeIndex].endTime,
        })).filter((entry) => entry.subject),
    )
}
