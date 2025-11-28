'use client';
import { CableSelector, type Cable } from "@/components/ui/CableSelector";
import { useState, useEffect } from 'react';
import { ConduitSelector, type Conduit } from "@/components/ui/ConduitSelector";

export default function Home() {

  const [selectedCable, setSelectedCable] = useState<Cable | null>(null);
  const [selectedConduitId, setSelectedConduitId] = useState<Conduit | null>(null);

  function calculateWeightCorrection(conduitId: number, cableOd: number, count: number): number {
    if (count === 1) return 1.0;
    if (count === 4) return 1.4;

    if (cableOd >= conduitId) return 0;

    // const D = conduitId;
    // const d = cableOd;
    const geometricTerm = cableOd / (conduitId - cableOd);
    const diameterRatio = conduitId / cableOd;
    const isCradled = diameterRatio >= 2.5;

    const useTriangular = count === 2 || !isCradled;

    if (useTriangular) {
      const radical = 1 - Math.pow(geometricTerm, 2);

      if (radical <= 0.0001) {
        return 0;
      }
      return 1 / Math.sqrt(radical);
    } else {
      return 1 + (4 / 3) * Math.pow(geometricTerm, 2);
    }
  }

  useEffect(() => {
    console.log("State updated: ", {
      cable: selectedCable,
      conduit: selectedConduitId,
    });
  }, [selectedCable, selectedConduitId])

  let wFactor = 0;
  let configType = "--";
  let diameterRatio = 0;

  const effectiveCount = selectedCable ? selectedCable.CONDUCTOR_NUMBER : 0;

  if (selectedCable && selectedConduitId) {
    wFactor = calculateWeightCorrection(
      selectedConduitId.INNER_CONDUIT_DIAMETER,
      selectedCable.OVERALL_DIAMETER,
      effectiveCount
    );
    diameterRatio = selectedConduitId.INNER_CONDUIT_DIAMETER / selectedCable.OVERALL_DIAMETER;

    if (effectiveCount < 2) {
      configType = 'Single';
    } else if (effectiveCount === 2) {
      configType = 'Dual';
    } else if (diameterRatio >= 2.5) {
      configType = 'Cradled';
    } else {
      configType = 'Triangular';
    }
  }

  return (

    <div>
      <CableSelector
        cables={cableData}
        onSelect={(cable) => setSelectedCable(cable)} />

      <ConduitSelector
        conduits={Conduits}
        onSelect={(conduit) => setSelectedConduitId(conduit)} />

      <label className="block text-sm text-black mb-2">Conductors</label>
      <div>
        <span>
          {selectedCable ? selectedCable.CONDUCTOR_NUMBER : '-'}
        </span>
        {selectedCable && <span className="text-xs uppercase text-black">Fixed</span>}
      </div>

      <div>
        <div>
          <div>
            <p>Calculated Factor ($w$)</p>
            <p>
              {selectedCable && selectedConduitId ? (wFactor > 0 ? wFactor.toFixed(3) : 'Jam') : '---'}
            </p>
          </div>
          <div>
            <p>Configuration</p>
            <p>{configType}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

const cableData = [
  {
    "COLBI_ID": "COLBI_ID_0007681",
    "ID": "17254",
    "STOCK_NUM": "105460",
    "SPEC_NAME": "AL 600V XLPE Insulation Single Type USE-2",
    "OVERALL_DIAMETER": 0.512, //inches
    "CONDUCTOR_NUMBER": 3
  },
  {
    "COLBI_ID": "COLBI_ID_0001988",
    "ID": "47101",
    "STOCK_NUM": "138929",
    "SPEC_NAME": "CU 1000V XLPE Insulation Teck 90 LSZH Jacket",
    "OVERALL_DIAMETER": 0.899,
    "CONDUCTOR_NUMBER": 2
  },
  {
    "COLBI_ID": "COLBI_ID_0005592",
    "ID": "4110",
    "STOCK_NUM": "646907",
    "SPEC_NAME": "CU 15kV NLEPR Insulation 133% IL AIA Red CPE-TP Jacket.  Tray Rated - Sunlight Resistant - For Direct Burial",
    "OVERALL_DIAMETER": 3.443,
    "CONDUCTOR_NUMBER": 1
  },
]

const Conduits = [
  {
    "INNER_CONDUIT_DIAMETER": 2.047
  },
  {
    "INNER_CONDUIT_DIAMETER": 6.031
  }
]


