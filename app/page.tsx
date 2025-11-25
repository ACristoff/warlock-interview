"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Home() {
  const [selectedCable, setSelectedCable] = useState();
  const [selectedConduit, setSelectedConduit] = useState();

  const cableData = [
    {
      COLBI_ID: "COLBI_ID_0007681",
      ID: "17254",
      STOCK_NUM: "105460",
      SPEC_NAME: "AL 600V XLPE Insulation Single Type USE-2",
      OVERALL_DIAMETER: 0.512, //inches
      CONDUCTOR_NUMBER: 3,
    },
    {
      COLBI_ID: "COLBI_ID_0001988",
      ID: "47101",
      STOCK_NUM: "138929",
      SPEC_NAME: "CU 1000V XLPE Insulation Teck 90 LSZH Jacket",
      OVERALL_DIAMETER: 0.899,
      CONDUCTOR_NUMBER: 2,
    },
    {
      COLBI_ID: "COLBI_ID_0005592",
      ID: "4110",
      STOCK_NUM: "646907",
      SPEC_NAME:
        "CU 15kV NLEPR Insulation 133% IL AIA Red CPE-TP Jacket.  Tray Rated - Sunlight Resistant - For Direct Burial",
      OVERALL_DIAMETER: 3.443,
      CONDUCTOR_NUMBER: 1,
    },
  ];

  const handleCableSelect = (cable) => {
    setSelectedCable(cable);
  };
  const handleConduitSelect = (conduit) => {
    setSelectedConduit(conduit);
  };

  function CableDropdown() {
    const items = cableData.map((cable) => {
      return (
        <DropdownMenuItem
          key={cable.COLBI_ID}
          onClick={() => {
            handleCableSelect(cable);
          }}
        >
          {cable.COLBI_ID}
        </DropdownMenuItem>
      );
    });
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>Cables</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {items}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const Conduits = [
    {
      INNER_CONDUIT_DIAMETER: 2.047,
    },
    {
      INNER_CONDUIT_DIAMETER: 6.031,
    },
  ];

  function ConduitDropdown() {
    const items = Conduits.map((conduit) => {
      return (
        <DropdownMenuItem
          key={conduit.INNER_CONDUIT_DIAMETER}
          onClick={() => {
            handleConduitSelect(conduit);
          }}
        >
          {conduit.INNER_CONDUIT_DIAMETER}
        </DropdownMenuItem>
      );
    });
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>Conduits</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {items}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Expected output is a configuration
  // Can be single, cradled or triangular
  // 1 conductor = single
  // conductor is the metal core (it *conducts*)
  // Inner Diameter (D): from conduit
  // Outer Diameter (d): from cable
  // All in inches from data
  const diameterRatio = (innerDiameter: number, outerDiameter: number) => {
    return innerDiameter / outerDiameter;
  };

  const calcConfiguration = () => {
    if (!selectedConduit || !selectedCable) {
      return "Missing selection";
    }
    const conduitDiameter = selectedConduit.INNER_CONDUIT_DIAMETER;
    const cableDiameter = selectedCable.OVERALL_DIAMETER;

    if (
      diameterRatio(conduitDiameter, cableDiameter) < 2.5 ||
      selectedCable.CONDUCTOR_NUMBER === 2
    ) {
      return "Triangular";
    } else if (diameterRatio(conduitDiameter, cableDiameter) >= 2.5) {
      return "Cradled";
    }
  };

  // create funcs for each correction factor

  //triangular
  const weightCorrectionTriangular = () => {
    if (!selectedConduit || !selectedCable) {
      return "Missing selection";
    }
    const D = selectedConduit.INNER_CONDUIT_DIAMETER;
    const d = selectedCable.OVERALL_DIAMETER;

    const weightCorrectionFactor = 1 / Math.sqrt(1 - (d / (D - d)) ** 2);
    return weightCorrectionFactor;
  };

  // cradles
  const weightCorrectionCradle = () => {
    if (!selectedConduit || !selectedCable) {
      return "Missing selection";
    }
    const D = selectedConduit.INNER_CONDUIT_DIAMETER;
    const d = selectedCable.OVERALL_DIAMETER;

    const weightCorrectionFactor = 1 + (4 / 3) * (d / (D - d)) ** 2;
    return weightCorrectionFactor;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="outline">Testable</Button>
      <CableDropdown />
      <ConduitDropdown />
      <div>Expected Output: {calcConfiguration()}</div>
      <div>
        {calcConfiguration() === "Triangular"
          ? weightCorrectionTriangular()
          : weightCorrectionCradle()}
      </div>
    </div>
  );
}
