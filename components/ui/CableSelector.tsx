'use client';

export type Cable = {
    COLBI_ID: string;
    ID: string;
    STOCK_NUM: string;
    SPEC_NAME: string;
    OVERALL_DIAMETER: number;
    CONDUCTOR_NUMBER: number;
}

interface Props {
    cables: Cable[];
    onSelect: (cable: Cable) => void;
}

export function CableSelector({ cables, onSelect }: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-bold text-black">
                Select Cable
            </label>

            <div className="relative">
                <select className='w-full p-2 border border-black'
                    onChange={(e) => {
                        const index = Number(e.target.value);
                        const selectedCable = cables[index];
                        onSelect(selectedCable);
                    }}
                    defaultValue=""
                >
                    <option value="" disabled>Choose a Cable</option>
                    {cables.map((cable, index) => (
                        <option key={cable.ID} value={index}>
                            {cable.STOCK_NUM} - {cable.SPEC_NAME} - {cable.OVERALL_DIAMETER}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
            <p className="text-xs text-black mt-2">
                Selection
            </p>
        </div>
    )
}