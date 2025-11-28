'use client';

export type Conduit = {
    INNER_CONDUIT_DIAMETER: number;
};

interface Props {
    conduits: Conduit[];
    onSelect: (conduit: Conduit) => void;
}

export function ConduitSelector({ conduits, onSelect }: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-bold text-black">
                Select Conduit
            </label>

            <div className="relative">
                <select className='w-full p-2 border border-black'
                    onChange={(e) => {
                        const index = Number(e.target.value);
                        if (!isNaN(index) && conduits[index]) {
                            onSelect(conduits[index]);
                        }
                    }}
                    defaultValue=""
                >
                    <option value="" disabled>Choose a Conduit</option>
                    {conduits.map((c, index) => (
                        <option key={index} value={index}>
                            {c.INNER_CONDUIT_DIAMETER}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}